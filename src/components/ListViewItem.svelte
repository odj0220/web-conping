<script lang="ts">
  import type { IContent } from 'src/global/types';
import Thumbnail from './common/shared/Thumbnail.svelte';

  export let onClick: (id: string) => void;
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

<li class="grid-item">
  <div class="left">
    <Thumbnail src={thumb} width="12rem" height="6.8rem"/>
  </div>

  <div
    class="right"
    on:click={() => onClick(id)}
  >
    <span class="head-line">{metaDataContent}</span>
    <span class="sub-head">{title}</span>
  </div>
</li>

<style lang="scss">
  .grid-item {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    .left {
      border-radius: 2px;
      overflow: hidden;
      flex-shrink: 0;
    }

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
