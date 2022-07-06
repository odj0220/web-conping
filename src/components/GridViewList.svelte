<script>
  import GridItem from './GridItem.svelte';

  export let contents;
  export let onClick;
</script>

<section class="grid-view-section">
  <ul class="grid-list">
    {#each contents as content, index }
      {#if index < 5} 
        <!-- TODO: 매직넘버 제거 -->
        <GridItem {content} {onClick} />
      {/if}
    {/each}
  </ul>
</section>

<style lang="scss">
  .grid-view-section {
    
    .grid-list {
      display: flex;
      flex-wrap: 'wrap';
      flex-direction: column;
      gap: 1.2rem;
      justify-content: 'space-between';
    }
  }
  
</style>