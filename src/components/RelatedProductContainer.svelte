<script lang="ts">
  import { onMount } from 'svelte';
  
  import { graphqlApi } from '$lib/_api_graphql';

  import RelatedProduct from './RelatedProduct.svelte';

  export let id: string;
  export let moreButton = true;
  export let timelineButtonVisible: boolean;
  export let onClickTimeButton: (num: number) => void;

  interface Product{
    id: string,
    name: string,
    brand: string,
    price: number,
    discount: number,
    category: string,
    exposed: [[number]],
  }

  const getRelatedProducts = async () => {
    const query = `{getProductsByContentId(id:"${id}"){id name price exposed}}`;
    const result = await graphqlApi(query);
    const productList = result?.data?.getProductsByContentId;

    return productList;
  };

  onMount(async () => {
    getRelatedProducts();
  });

</script>


{#await getRelatedProducts()}
{:then productList}
    {#if productList.length}
        <RelatedProduct
                data={productList}
                {moreButton}
                {onClickTimeButton}
                {timelineButtonVisible}
        />
    {/if}
{/await}
