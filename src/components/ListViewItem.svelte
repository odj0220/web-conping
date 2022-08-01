<script lang="ts">
  import Thumbnail from './common/shared/Thumbnail.svelte';

  import type { IContent } from 'src/global/types';

  export let onClick: (id: number) => void;
  export let content: IContent;

  const {
    id,
    title,
    thumb,
    episode,
    program: {
      title: programTitle,
    },
  } = content;

  $: metaDataContent = `${programTitle} ${episode}화`;
</script>

<li class="grid-item" on:click={() => onClick(id)}>
  <Thumbnail src={thumb} width="12rem" height="6.8rem" borderRadius="0.2rem" />

  <div class="right">
    <span class="head-line">{metaDataContent}</span>
    <span class="sub-head">{title}</span>
  </div>
</li>

<style lang="scss">
  .grid-item {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    .right {
      display: flex;
      flex-direction: column;
      font-size: 1.2rem;
      @include caption2-400;

      .head-line {
        display: block;
        color: #8A8A8A;
        margin-bottom: 0.4rem;
      }
      .sub-head {
        @include ellipsis(2);
      }
    }
  }
</style>
