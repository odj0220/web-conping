<script type="ts">
  import { graphqlApi } from '$lib/_api';

  import Container from '$component/common/layout/Container.svelte';
  import EmptyMessage from '$component/common/shared/EmptyMessage.svelte';
  import ProductGridList from '$component/ProductGridList.svelte';
  import Title from '$component/Title.svelte';
  import MoreButton from '$component/common/shared/MoreButton.svelte';
  
  import type { TitleElement } from 'src/global/types';

  export let title : TitleElement[] = [];
  export let id : string;
  export let moreButton: boolean;
  export let category: string;

  const getData = async () => {
    const query = `{
      getProductByCelebId (id: "${id}") {
          id
          name
          brand
          price
          image
        }
      }`;

    const { data: { getProductByCelebId } } = await graphqlApi(query);

    return getProductByCelebId;
  };

  const promise = getData();

</script>

{#await promise}
{:then data} 
  {#if data.length}
    <Container margin="5.6rem 0 0">
      {#if title.length}
        <Title title={title}/>
        <ProductGridList data={[...data].slice(0, 4)}/>
        {:else}
        <ProductGridList {data}/>
      {/if}


      {#if moreButton && data.length > 4}
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
