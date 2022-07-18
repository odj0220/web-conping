<script lang="ts">
  import type { IContent } from 'src/global/types';

  import ShortsVodItem from './ShortsVodItem.svelte';

  export let contents: IContent[] = [];
  export let onClick: (id: string) => void;

</script>

<ul>
  {#each contents as content}
    <ShortsVodItem {content} {onClick} width="144px" height="240px"/>
  {/each}
</ul>

<style lang="scss">
  ul {
    @include horizontalScroll(1.2rem, 1.6rem);
  }
</style>
