<script lang="ts">
import type { IProduct } from 'src/global/types';
import ShopItem from './ShopItem.svelte';

export let list: IProduct[];
</script>

<ul class="shop-list">
  {#each list as item}
    <ShopItem {item}/>
  {/each}
</ul>

<style lang="scss">
    
</style>