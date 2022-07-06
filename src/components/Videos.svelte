<script>
  import Video from './Video.svelte';

  export let contents;
  export let onClick;
</script>

<section class="videos-wrapper">
  <ul class="contents-container"> 
    {#each contents as content, index }
      {#if index < 2}
        <Video {content} {onClick} />
      {/if}
    {/each}
  </ul>
</section>

<style lang="scss">
  @import '../styles/variables.scss';

  .videos-wrapper {
    .contents-container {
      display: flex;
      flex-wrap: 'wrap';
      flex-direction: column;
      gap: 2rem;
      justify-content: 'space-between';
    }
  }
  
</style>