<script lang="ts">
  import type { Content } from 'src/global/types';

  import ShortVodItem from './ShortVodItem.svelte';

  export let contents: Content[] = [];

  export let onClick: (id: string) => void;
</script>

<section>
  {#each contents as content}
    <ShortVodItem
      {content}
      {onClick}
    />
  {/each}
</section>

<style lang="scss">
  section {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 2.4rem;
    column-gap: 1.2rem;
  }
</style>
