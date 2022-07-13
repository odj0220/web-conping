<script lang="ts">
  import type { Content } from 'src/global/types';

  import ListViewItem from './ListViewItem.svelte';

  export let contents: Content[] = [];
  export let onClick: (id: string) => void;

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
      margin-bottom: 1.2rem;
    }
  }
</style>