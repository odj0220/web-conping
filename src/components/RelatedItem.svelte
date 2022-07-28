<script lang="ts">
  import type { IRelatedItem } from 'src/global/types';

  import Avatar from './common/shared/Avatar.svelte';
  import Thumbnail from './common/shared/Thumbnail.svelte';

  export let relatedItem: IRelatedItem;
  export let onClickRelatedItem: () => void;

  $:type = relatedItem.type;
  $:id = relatedItem.id;
  $:thumbnail = relatedItem.thumbnail;
  $:title = relatedItem.title;

</script>

<div class="container" on:click="{(e) => onClickRelatedItem(e, type, id)}">
  {#if type.toUpperCase() === 'CELEB'}
    <Avatar size={4} src={thumbnail} alt="셀럽 섬네일" />
  {:else}
    <Thumbnail src={thumbnail} width="4rem" height="4rem" borderRadius="0.2rem"/>
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

    .right {
      @include caption2-400;
      @include ellipsis(3);
    }
  }
</style>
