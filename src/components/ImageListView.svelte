<script>
  import ListViewItem from './ListViewItem.svelte';

  export let contents;
  export let onClick;
</script>

<section>
  <ul>
    {#each contents as content, index }
      <ListViewItem {content} {onClick} />
    {/each}
  </ul>
</section>

<style lang="scss">
  section {
    ul {
      display: flex;
      flex-direction: column;
      flex-wrap: 'wrap';
      justify-content: 'space-between';
      gap: 1.2rem;
    }
  }
  
</style>