<script lang="ts">
  import type { IProduct } from 'src/global/types';

  import ShopItem from './ShopItem.svelte';

  export let products: IProduct[];
  export let onClickRelatedItem: () => void;
</script>

<ul class="shop-list">
  {#each products as product (product.id)}
    <ShopItem
      item={product}
      {onClickRelatedItem}
      on:go-link
    />
  {/each}
</ul>

<style lang="scss">
  .shop-list {
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }
</style>
