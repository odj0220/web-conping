<script lang="ts">
  import type { IContent } from 'src/global/types';

  import ListViewItem from './ListViewItem.svelte';

  export let contents: IContent[] = [];
  export let onClick: (id: number) => void;

</script>

<section>
  <ul>
    {#each contents as content}
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