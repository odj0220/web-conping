<script type="ts">
  import { graphqlApi } from '$lib/_api';

  import type { TitleElement } from 'src/global/types';
  
  import Container from '$component/common/layout/Container.svelte';
  import EmptyMessage from '$component/common/shared/EmptyMessage.svelte';
  import ProductGridList from '$component/ProductGridList.svelte';
  import Title from '$component/Title.svelte';
  import MoreButton from '$component/common/shared/MoreButton.svelte';

  export let title : TitleElement[] = [];
  export let id : string;
  export let moreButton: boolean;

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
  <Container>
    {#if data.length}

      {#if title}
        <Title title={title}/>
      {/if}

      <ProductGridList {data}/>

      {#if moreButton}
        <MoreButton value="서울리안 상품 더보기"/>
      {/if}

    {:else}
      <EmptyMessage text="서울리안 님의 상품" />
{/if}
  </Container>
{/await}
