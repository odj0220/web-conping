<script type="ts">
  import { graphqlApi } from '$lib/_api';

  import Container from '$component/common/layout/Container.svelte';
  import EmptyMessage from '$component/common/shared/EmptyMessage.svelte';
  import ProductGridList from '$component/ProductGridList.svelte';
  import Title from '$component/Title.svelte';
  import MoreButton from '$component/common/shared/MoreButton.svelte';
  import type { IProduct, TitleElement } from 'src/global/types';

  export let title : TitleElement[] = [];
  export let id : string;
  export let moreButton: boolean;
  export let category: string;
  export let onClickMoreButton: (index: number) => void;

  let products: IProduct[] = [];
  let end = false;
  let cursor = '';

  $: num = title.length ? 4 : 6;
  $: infiniteScroll = !title.length;

  const getData = async () => {
    const query = `{
              getProductsByCelebId (id: "${id}", limit: ${num}) {
                    products {
                        id
                        name
                        brand
                        price
                        discountRate
                        storeUrl
                        image
                        views
                        createDt
                    }
                    pageInfo {
                        startCursor
                        hasNextPage
                    }
                }
            }
        `;

    const { data: { getProductsByCelebId } } = await graphqlApi(query);
  
    products = [...products, ...getProductsByCelebId.products];
    end = !getProductsByCelebId.pageInfo.hasNextPage;
    cursor = getProductsByCelebId.pageInfo.startCursor;
  };

  async function runInfiniteScrolling(event) {
    const detail = event.detail;
    await getData();
    detail.stop();
  }
</script>

{#await getData()}
{:then}
  {#if products.length}
      <Container margin="0 0 5.6rem">
        {#if title.length}
            <Title title={title}/>
            <ProductGridList data={products}/>
            {#if moreButton }
                {#if products.length >= 4}
                    <MoreButton value={`${category} 상품 더보기`} onClick={() => onClickMoreButton(1)}/>
                    {:else}
                    <section class="gap"></section>
                {/if}
            {/if}
        {:else}
          <ProductGridList
                  data={products}
                  {infiniteScroll}
                  {end}
                  {cursor}
                  on:request-more={runInfiniteScrolling}
          />
        {/if}
      </Container>
    {:else}
      {#if !title.length}
        <EmptyMessage text={`${category}님의 상품`} />
      {/if}
  {/if}
{/await}

<style lang="scss">
    .gap {
      margin-left: -1.6rem;
      margin-right: -1.6rem;
      width: 100vw;
      margin-top: 1.6rem;
    }
</style>
