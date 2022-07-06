<script lang="ts">
  interface TitleElement {
    text : string,
    type?: string
  }

  export let onClick : () => void;
  export let title : TitleElement[];
</script>

<h1 {onClick}>
  {#each title as element }
    <span class={element?.type}>{element.text} </span>
  {/each}
</h1>

<style lang="scss">
  @import '../styles/variables.scss';

  h1 {
    font-size: 1.6rem;
    line-height: 1.997rem;
    font-weight: 700;
    color: #fff;

    &:active {
      transform: scale(1.05);
      //TODO: 클릭할 때 효과 정의 필요
    }
    
    .primary-90 {
      color: $primary-90; 
    }
    .primary-80 {
      color: $primary-80; 
    }
    .primary-70 {
      color: $primary-70; 
    }
    .primary-60 {
      color: $primary-60; 
    }
    .primary-50 {
      color: $primary-50; 
    }
    .primary-40 {
      color: $primary-40; 
    }
    .primary-30 {
      color: $primary-30; 
    }
    .primary-20 {
      color: $primary-20; 
    }
    .primary-10 {
      color: $primary-10; 
    }
  }

</style>
