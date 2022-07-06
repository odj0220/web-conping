<script>
  export let onClick;
  export let content;
</script>

<li
  class="grid-item"
>
  <img
    src={content.thumb}
    alt="방송이미지"
    class="left"
    on:click={() => onClick(content.id)}
  > 

  <div
    class="right"
    on:click={() => onClick(content.id)}
  >
    <span class="title">{content.program.name}</span>
    <span class="sub-title">{content.name}</span>
  </div>
</li>

<style lang="scss">
  .grid-item {
    display: flex;
    flex-direction: row;
    height: 6.8rem;
    gap: 1.2rem;

    
    .left {
      width: 12rem;
   
      &:active {
        transform: scale(1.1);
        //TODO: 클릭할 때 효과 정의 필요
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin: 1rem;
      font-size: 1.2rem;

      .title {
        color: #8A8A8A;
      }

      > *{
        &:active {
          transform: scale(1.1);
          //TODO: 클릭할 때 효과 정의 필요
        }
      }
    }
  }
</style>