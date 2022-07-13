<script lang="ts">
  import type { Content } from 'src/global/types';

  import ShortVodItem from './ShortVodItem.svelte';

  export let contents: Content[] = [];
  export let onClick: (id: string) => void;

</script>

<section>
  {#each contents as content}
    <ShortVodItem {content} {onClick} />
  {/each}
</section>

<style lang="scss">
  section {
    min-width: 100%;
    display: flex;
    gap: 1.2rem;
    padding: 0 1.6rem;
    & > :global(*) {
      min-width: 14rem !important;
      max-width: 14rem !important;
    }
  }
</style>
