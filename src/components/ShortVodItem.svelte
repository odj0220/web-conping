<script lang="ts">
  import type { IContent } from 'src/global/types';

  export let content: IContent;
  export let onClick: (id: string) => void;
</script>

<section>
  <div class="container" on:click={() => onClick(`${content.videoId}`)}>
    <img src={content.thumb} alt="shorts-preview">
    <div class="overlay"></div>
    <div class="data">
      <h6 class="title">
        {content.title}
      </h6>
    </div>
  </div>
</section>

<style lang="scss">
  section {
    width: 100%;
    border-radius: 0.4rem;
    overflow: hidden;
    .container {
      position: relative;
      padding-bottom: 171.42%;
      .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #1c1c1c;
          opacity: 0.5;
          z-index: 2;
      }

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;
        object-fit: cover;
      }

      .data {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        z-index: 3;
        padding: 0 0.6rem 1rem 1rem;
        box-sizing: border-box;
        height: 5.5rem;

        .title {
          color: #fff;
          font-size: 1.2rem;
          line-height: 1.498rem;
          letter-spacing: -0.015rem;
          font-weight: 400;
          height: 100%;
          overflow: hidden;

          word-break: break-all;
          text-overflow: ellipsis;

          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
</style>
