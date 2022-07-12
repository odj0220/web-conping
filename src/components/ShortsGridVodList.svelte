<script lang="ts">
  import ShortVodItem from './ShortVodItem.svelte';

  export let contents: any[] = [];

  export let onClick;
</script>

<section>
  {#each contents as content}
    <ShortVodItem content={content} {onClick}></ShortVodItem>
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
