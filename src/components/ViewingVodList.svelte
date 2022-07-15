<script lang="ts">
  import type { IContent } from 'src/global/types';

  import ViewingVodItem from './VewingVodItem.svelte';

  export let contents: IContent[];

  export let onClick: (id: string) => void;
</script>

<section>
  {#each contents as content}
    <ViewingVodItem
      {content}
      {onClick}
    />
  {/each}
</section>

<style lang="scss">
  section {
    display: flex;
    padding: 0 1.2rem;
    & > :global(*) {
      &:first-child {
        margin-left: 0 !important;
      }
    }
  }
</style>
