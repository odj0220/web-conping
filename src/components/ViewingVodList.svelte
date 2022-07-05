<script lang="ts">
    import ViewingVodItem from './VewingVodItem.svelte';
    export let contents: any[] = [];

    function onClick() {
        console.log('클릭!');
    }
</script>

<section>
    {#each contents as content}
        <ViewingVodItem content={content} onClick={onClick}></ViewingVodItem>
    {/each}
</section>


<style lang="scss">
    section {
      display: flex;
      & > :global(*) {
        &:first-child {
          margin-left: 0 !important;
        }
      }
    }
</style>
