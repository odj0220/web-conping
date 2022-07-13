<script lang="ts">
    import ShortVodItem from './ShortVodItem.svelte';

    export let contents: any[] = [];

    function onClick() {
      console.log('onClick');
    }

</script>

<section>
    {#each contents as content}
        <ShortVodItem content={content} onClick={onClick}></ShortVodItem>
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
