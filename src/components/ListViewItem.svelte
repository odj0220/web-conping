<script lang="ts">
  import type { Content } from 'src/global/types';

  export let onClick: (id: string) => void;
  export let content: Content;
</script>

<li class="grid-item">
  <div class="left">
    <img
      src={content.thumb}
      alt="방송이미지"
      on:click={() => onClick(content.videoId)}
    > 
  </div>

  <div
    class="right"
    on:click={() => onClick(content.videoId)}
  >
    <span class="title">{content.program.title}</span>
    <span class="sub-title">{content.title}</span>
  </div>
</li>

<style lang="scss">
  .grid-item {
    display: grid;
    grid-template-columns: 1fr 2fr;
    min-height: 6.8rem;

    .left {
      border-radius: 2px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
   
      &:active {
        transform: scale(1.1);
        //TODO: 클릭할 때 효과 정의 필요
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 1rem;
      font-size: 1.2rem;

      .title {
        color: #8A8A8A;
      }
    }
  }
</style>
