<script lang="ts">
  import Video from './Video.svelte';

  export let title: string;
  export let contents: any[];
  export let onClick: () => void;
</script>

<section class="videos-wrapper">
  {#if title}
    <h2 class="title">
      {title}
    </h2>
  {/if}
  
  <ul class="contents-container">
    {#each contents.splice(0, 2) as content, index }
      <Video {content} {onClick} />
    {/each}
  </ul>
</section>

<style lang="scss">
  @import '../styles/variables.scss';

  .videos-wrapper {
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
