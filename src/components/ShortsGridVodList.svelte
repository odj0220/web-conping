<script lang="ts">
  import type { IContent } from 'src/global/types';

  import ShortsVodItem from './ShortsVodItem.svelte';

  export let contents: IContent[] = [];

  export let onClick: (id: number) => void;
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
    @include gridItem(1.2rem, 2.4rem);
  }
</style>
