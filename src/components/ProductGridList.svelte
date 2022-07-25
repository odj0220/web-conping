<script lang="ts">
  import ProductGridItem from './ProductGridItem.svelte';

  import type { IProduct } from 'src/global/types';

  export let data:IProduct[] = [];

</script>
<ul class="product-grid-list">
  {#each data as item}
    <ProductGridItem data={item}/>
  {/each}
</ul>

<style lang="scss">
  .product-grid-list {
    width: 100%;
    display: grid;
    flex-wrap: wrap;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    row-gap: 1.6rem;
    column-gap: 1.6rem;
  }
</style>