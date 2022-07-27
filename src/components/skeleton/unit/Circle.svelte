<script lang="ts">
import Icon from '$component/icons/Icon.svelte';

export let size: number;
export let margin = '0';
</script>

<div class="circle" style="width: {size}rem; height:{size}rem; margin: {margin}; border-radius: 50%;">
  <span class="icon">
    {#if size <= 4.4}
    {:else if size <= 12}
      <Icon name="loading_small"/>
    {:else if size <= 14.4}
      <Icon name="loading_mideum"/>
    {:else}
      <Icon name="loading_large"/>
    {/if}
  </span>
</div>

<style lang="scss">
  .circle {
    background-color: $bg-gray-32;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>