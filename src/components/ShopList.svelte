<script lang="ts">
  import type { IProduct } from 'src/global/types';
  
  import ShopItem from './ShopItem.svelte';

  export let products: IProduct[];
</script>

<ul class="shop-list">
  {#each products as item}
    <ShopItem {item}/>
  {/each}
</ul>

<style lang="scss">
  .shop-list {
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }
</style>
