<script lang="ts">
  import Icon from '$component/icons/Icon.svelte';

  export let size = 0;
  export let src = '';
  export let alt = '';

  const setImageSrc = (value: string) => {
    src = value;
  };

</script>

<div class="container" style="width: {size}rem; height: {size}rem">
  {#if src}
  <img src={src} alt={alt} on:error="{() => setImageSrc("")}"/>
  {:else}
  <div class="empty" style="width: {size}rem; height: {size}rem">
    {#if size <= 4.4}
    {:else if size <= 12}
      <Icon name="loading_small"/>
    {:else if size <= 14.4}
      <Icon name="loading_mideum"/>
    {:else}
      <Icon name="loading_large"/>
    {/if}
  </div>
  {/if}
</div>

<style lang="scss">
  .container {
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    background-color: $bg-gray-32;


    .empty {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
