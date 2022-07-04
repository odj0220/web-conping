<script lang="ts">
    import ShortVodItem from './ShortVodItem.svelte';

    export let contents: any[] = [];

</script>

<section>
    {#each contents as content}
        <ShortVodItem content={content}></ShortVodItem>
    {/each}
</section>

<style lang="scss">
    section {
      display: flex;
      margin: 0 auto;
      & > :global(*) {
        &:first-child {
          margin-left: 0 !important;
        }
      }
    }
</style>
