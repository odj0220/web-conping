<script lang="ts">
  import type { TitleElement } from 'src/global/types';
  
  export let onClick: () => void;
  export let title: TitleElement[];
  export let marginLeft = '0';
  export let marginBottom = '1.2rem';

  function clickTitle() {
    if (!onClick) {
      return;
    }
  
    onClick();
  }
</script>

{#if title?.length }
  <h1 on:click={() => clickTitle()} style="margin-left: {marginLeft}; margin-bottom: {marginBottom}">
    {#each title as element }
    <span class={element?.type} style={element.style}>{element.text} </span>
    {/each}
  </h1>
{/if}

<style lang="scss">
  h1 {
    display: flex;
    flex-direction: row;
    gap: 0.4rem;
    align-items: center;
    margin-bottom: 12px;
    @include body1-700;

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
