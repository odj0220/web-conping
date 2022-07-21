<script type="ts">
  import { graphqlApi } from '$lib/_api';

  import type { TitleElement } from 'src/global/types';
  
  import Container from '$component/common/layout/Container.svelte';
  import EmptyMessage from '$component/common/shared/EmptyMessage.svelte';
  import ProductGridList from '$component/ProductGridList.svelte';
  import Title from '$component/Title.svelte';

  export let title : TitleElement[] = [];
  export let id : string;

  const getData = async () => {
    const query = `{
      getProductByCelebId(id:"${id}"){
          id
          name
        }
      }`;

    const { data: getProductByCelebId } = await graphqlApi(query);

    return getProductByCelebId;
  };

  const promise = getData();

</script>

{#await promise}
{:then data} 
{#if data.length}
  <Container>
    {#if title}
      <Title title={title}/>
    {/if}
    <ProductGridList {data}/>
  </Container>
  {:else}
    <EmptyMessage text="서울리안 님의 상품" />
  {/if}
{/await}
