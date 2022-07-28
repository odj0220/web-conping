<script lang="ts">
  import type { IRelatedItem } from 'src/global/types';

  import Avatar from './common/shared/Avatar.svelte';
  import Thumbnail from './common/shared/Thumbnail.svelte';

  export let relatedItem: IRelatedItem;

  $:type = relatedItem.type;
  $:thumbnail = relatedItem.thumbnail;
  $:title = relatedItem.title;
</script>

<div class="container">
  {#if type.toUpperCase() === 'CELEB'}
    <Avatar size="4rem" src={thumbnail} alt="셀럽 섬네일" />
  {:else}
    <Thumbnail src={thumbnail} width="4rem" height="4rem"/>
  {/if}

  <div class="right">
    {title}
  </div>
</div>

<style lang="scss">
  .container {
    height: 100%;
    display: flex;
    gap: 0.8rem;
    align-items: center;
    justify-content: flex-start;

    .right {
      @include caption2-400;
      @include ellipsis(3);
    }
  }
</style>
