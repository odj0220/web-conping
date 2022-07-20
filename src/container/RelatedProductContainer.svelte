<script lang="ts">
  import RelatedProduct from '$component/RelatedProduct.svelte';

  import { graphqlApi } from '../lib/_api';

  export let id: string;
  export let moreButton = true;
  export let timelineButtonVisible: boolean;
  export let onClickTimeButton: (num: number) => void;

  const getRelatedProducts = async () => {
    const query = `{
      getProductsByContentId(id:"${id}") {
        id
        name
        price
        exposed
      }
    }`;
  
    const result = await graphqlApi(query);
  
    const productList = result?.data?.getProductsByContentId;

    return productList;
  };
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
