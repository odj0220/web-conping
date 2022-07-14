<script lang="ts">
  import { onMount } from 'svelte';
  
  import type { Content } from 'src/global/types';

  export let content!: Content;
  export let percent = 24;
  export let onClick: (id: string) => void;

  let ratio = 0;

  onMount(() => {
    ratio = ((360 / 100) * percent) / 2;
  });
</script>

<section class="viewing-vod-item">
  <div class="thumb-wrapper">
    <div class="circle">
      <div class="mask half">
        <div class="fill" style="transform: rotate({ratio}deg)"></div>
      </div>
      <div class="mask full" style="transform: rotate({ratio}deg)">
        <div class="fill" style="transform: rotate({ratio}deg)"></div>
      </div>
    </div>
    <img class="thumbnail" src={content.thumb} alt="thubnail"/>
    <div class="play-btn-wrapper">
      <button on:click={() => onClick(`${content.id}`)}>
        <img class="play-btn" src="/images/icons/ic_play.svg" alt="play-btn"/>
      </button>
    </div>
  </div>

  <p class="title">
    {content?.title}
  </p>
</section>

<style lang="scss">
  @import "../styles/variables.scss";
  @import "../styles/modules.scss";

    .viewing-vod-item {
      width: 8rem;
      margin-left: 2rem;

      .thumb-wrapper {
        position: relative;
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
        overflow: hidden;
        background-color: #F2F2F2;
        margin-bottom: 0.4rem;

        .thumbnail {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 7.6rem;
          height: 7.6rem;
          border-radius: 50%;
          z-index: 2;
          object-fit: cover;
          object-position: center center;
        }

        .play-btn-wrapper {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 3;
          width: 2rem;
          height: 2rem;

          button {
            margin: 0;
            padding: 0;
            background: transparent;
            border: none;
            cursor:pointer;
          }
        }

        .circle {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;

          .mask, .fill {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }

          .mask {
            clip: rect(0px, 8rem, 8rem, 4rem);
            .fill {
              clip: rect(0, 4rem, 8rem, 0);
              background-color: #AE3EEF;
            }
          }
        }
      }

      .title {
        @include caption3;
        @include ellipsis(2)
      }
    }
</style>
