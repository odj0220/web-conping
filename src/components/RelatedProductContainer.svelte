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

  let productList: Product[];

  const getRelatedProducts = async () => {
    const query = `{getProductsByContentId(id:"${id}"){id name price exposed}}`;
    const result = await graphqlApi(query);
    productList = result?.data?.getProductsByContentId;
  };

  onMount(async () => {
    getRelatedProducts();
  });

</script>

<RelatedProduct
  data={productList}
  {moreButton}
  {onClickTimeButton}
  {timelineButtonVisible}
/>
