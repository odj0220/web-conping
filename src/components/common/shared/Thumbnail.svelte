<script lang="ts">
  import Icon from '$component/icons/Icon.svelte';
  import RankBadge from './RankBadge.svelte';

  export let src = '';
  export let alt = '';
  export let width = '';
  export let height = '';
  export let borderRadius = '0.4rem';
  export let rank: string;
  export let iconTheme: string;

  const setImageSrc = (value: string) => {
    src = value;
  };

</script>

<div
  class="thumbnail"
  style="width: {width}; padding-bottom: {height}; border-radius:{borderRadius}"
  >
  {#if src}
    <img src={src} alt={alt} on:error="{() => setImageSrc("")}"/>
    {:else}
    <div class="empty">
      <Icon name="loading_small" />
    </div>
    {/if}
    {#if rank }
      <RankBadge {rank} {iconTheme} />
    {/if}
  </div>

<style lang="scss">
  .thumbnail {
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
    background-color: $bg-black-21;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
    }
    .empty {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
