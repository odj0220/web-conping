<script lang="ts">
  import type { IContent } from 'src/global/types';

  import ShortsVodItem from './ShortsVodItem.svelte';

  export let contents: IContent[] = [];

  export let onClick: (id: string) => void;
</script>

<ul>
  {#each contents as content}
    <ShortsVodItem
      {content}
      {onClick}
    />
  {/each}
</ul>

<style lang="scss">
  ul {
    width: 100%;
    display: grid;
    flex-wrap: wrap;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    row-gap: 2.4rem;
    column-gap: 1.2rem;
  }
</style>
