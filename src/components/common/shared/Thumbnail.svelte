<script lang="ts">
  import RankBadge from './RankBadge.svelte';

  export let src = '';
  export let alt = '';
  export let width = '';
  export let height = '';
  export let rank: string;
  export let iconTheme: string;
</script>

<div class="thumbnail" style="width: {width}; padding-bottom: {height}">
  <img src={src} alt={alt} />

  {#if rank }
    <RankBadge {rank} {iconTheme} />
  {/if}
</div>

<style lang="scss">
  .thumbnail {
    position: relative;
    border-radius: 0.4rem;
    overflow: hidden;
    background-color: gray;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
</style>
