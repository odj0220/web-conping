<script lang="ts">
  export let onClick: () => void;
  export let content;
</script>

<li
  class="grid-item"
>
<div class="left">
  <img
    src={content.thumb}
    alt="방송이미지"
    on:click={() => onClick(content.program.id)}
  > 
</div>

  <div
    class="right"
    on:click={() => onClick(content.program.id)}
  >
    <span class="title">{content.program.name}</span>
    <span class="sub-title">{content.name}</span>
  </div>
</li>

<style lang="scss">
  @import '../styles/modules.scss';
  @import '../styles/variables.scss';

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