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
    {#each contents as content, index }
      {#if index < 2}  
        <Video {content} {onClick} />
      {/if}
    {/each}
  </ul>
</section>

<style lang="scss">
  .videos-wrapper {
    padding: 1.6rem;
    
    .title {
      margin-bottom: 1.2rem;
      font-size: '2rem';
      font-weight: bold;
      text-align: 'center';
      color: '#75A293';
      line-height: 1.2;
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