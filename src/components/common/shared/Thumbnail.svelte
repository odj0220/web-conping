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
  export let targetUrl: string;
  export let onClick: (url: string) => void;

  const setImageSrc = (value: string) => {
    src = value;
  };

</script>

<div
  class="thumbnail"
  style="width: {width}; padding-bottom: {height}; border-radius:{borderRadius}"
  on:click={() => onClick(targetUrl)}
  >
  {#if src}
    <img src={src} alt={alt} on:error="{() => setImageSrc("")}"/>
    {#if rank }
      <RankBadge {rank} {iconTheme} />
    {/if}
  {:else}
    <div class="empty">
      <Icon name="loading_small" />
    </div>
  {/if}
</div>

<style lang="scss">
.thumbnail {
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
