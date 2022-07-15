<script lang="ts">
  import type { Content } from 'src/global/types';

  export let onClick: (id: string) => void;
  export let content: Content;

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
    <img
      src={thumb}
      alt="방송이미지"
      on:click={() => onClick(id)}
    > 
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
    }

    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 1rem;
      font-size: 1.2rem;

      .head-line {
        color: #8A8A8A;
      }
    }
  }
</style>
