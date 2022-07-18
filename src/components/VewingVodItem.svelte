<script lang="ts">
import { onMount } from 'svelte';
import type { IContent } from 'src/global/types';
import Icon from './icons/Icon.svelte';

export let content!: IContent;
export let onClick: (id: string) => void;

let ratio = 0;
const { id, thumb, title, duration, currentTime } = content;

onMount(() => {
  if (duration && currentTime) {
    ratio = (currentTime / duration) * 100;
  }
});
</script>

<div class="viewing-vod-item" on:click={() => onClick(`${id}`)}>
  <div class="thumb-wrapper">
    <div class="progress">
      <svg>
        <circle cx="40" cy="40" r="40" style="--percent: {ratio}"></circle>
      </svg>
    </div>
    <img class="thumbnail" src={thumb} alt="thubnail"/>
    <div class="play-btn-wrapper">
      <Icon name="play" size="2rem" />
    </div>
  </div>
  <h6 class="title">
    {title}
  </h6>
</div>

<style lang="scss">
  .viewing-vod-item {
    width: 8rem;
    .thumb-wrapper {
      position: relative;
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: 0.4rem;

      .thumbnail {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        z-index: 2;
      }

      .play-btn-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        width: 2rem;
        height: 2rem;
      }

      .progress {
        position: absolute;
        top: 0;
        left: 0;
        width: 8rem;
        height: 8rem;
        z-index: 10;
        svg {
          position: relative;
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
          circle {
            width: 100%;
            height: 100%;
            fill: none;
            stroke: #f0f0f0;
            stroke-width: 2;
            stroke-dasharray: 251.3px;
            stroke-dashoffset: calc(251.3px - (251.3px * var(--percent)) / 100);
            stroke: $primary-40;
          }
        }
      }
      // .circle {
      //   position: absolute;
      //   top: 0;
      //   left: 0;
      //   width: 100%;
      //   height: 100%;
      //   z-index: 1;

      //   .mask, .fill {
      //     position: absolute;
      //     top: 0;
      //     left: 0;
      //     width: 100%;
      //     height: 100%;
      //     border-radius: 50%;
      //   }

      //   .mask {
      //     clip: rect(0px, 8rem, 8rem, 4rem);
      //     .fill {
      //       clip: rect(0, 4rem, 8rem, 0);
      //       background-color: #AE3EEF;
      //     }
      //   }
      // }
    }

    .title {
      @include caption3;
      @include ellipsis(2);
      text-align: center;
      margin-bottom: 1rem;
    }
  }
</style>
