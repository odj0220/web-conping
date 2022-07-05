<script>
  import Video from './Video.svelte';

  export let title;
  export let contents;
  export let onClick;
</script>

<section class="videos-wrapper">
  <h2 class="title">
    {title}
  </h2>
  
  <ul class="contents-container">
    {#each contents as content }
      <Video {content} {onClick} />
    {/each}
  </ul>
</section>

<style lang="scss">
  @import '../styles/variables.scss';

  .videos-wrapper {
    padding: 1.6rem;
    
    .title {
      @include body3-700;
      margin-bottom: 1.2rem;
    }
    
    .contents-container {
      display: flex;
      flex-wrap: 'wrap';
      flex-direction: column;
      gap: 2rem;
      justify-content: 'space-between';
    }
  }
  
</style>