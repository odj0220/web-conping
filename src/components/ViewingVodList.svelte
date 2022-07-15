<script lang="ts">
  import type { Content } from 'src/global/types';

  import ViewingVodItem from './VewingVodItem.svelte';

  export let contents: Content[];

  export let onClick: (id: string) => void;
  console.log('contents', contents);
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
    @include horizontalScroll(2rem, 1.6rem);
    & > :global(*) {
      &:first-child {
        margin-left: 0 !important;
      }
    }
  }
</style>
