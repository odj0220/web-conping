<script type="ts">
  import { graphqlApi } from '$lib/_api';

  import Container from '$component/common/layout/Container.svelte';
  import EmptyMessage from '$component/common/shared/EmptyMessage.svelte';
  import ProductGridList from '$component/ProductGridList.svelte';
  import Title from '$component/Title.svelte';
  import MoreButton from '$component/common/shared/MoreButton.svelte';
  import { onMount } from 'svelte';

  import type { IProduct, TitleElement } from 'src/global/types';

  export let title : TitleElement[] = [];
  export let id : string;
  export let moreButton: boolean;
  export let category: string;

  let products: IProduct[] = [];
  let end = false;
  let cursor = '';

  $: num = title.length ? 4 : 6;
  $: infiniteScroll = !title.length;

  const getData = async () => {
    const query = `{
              getProductsByCelebId (id: "1", limit: ${num}) {
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
    let end = getProductsByCelebId.pageInfo.hasNextPage;
    let cursor = getProductsByCelebId.pageInfo.startCursor;
  };

  onMount(async () => {
    getData();
  });

</script>

{#await getData()}
{:then}
  {#if products.length}
    <Container margin="5.6rem 0 0">
      {#if title.length}
        <Title title={title}/>
        <ProductGridList data={[...products].slice(0, 4)}/>
        {:else}
        <ProductGridList {products}/>
      {/if}

      {#if moreButton && products.length > 4}
        <MoreButton value={`${category} 상품 더보기`}/>
      {/if}
    </Container>
    {:else}
    {#if title.length}

    {:else}
      <EmptyMessage text={`${category}님의 상품`} />
    {/if}
  {/if}
{/await}
