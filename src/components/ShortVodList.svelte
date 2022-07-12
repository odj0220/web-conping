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
      padding: 0 1.6rem;
      display: flex;
      & > :global(*) {
        &:first-child {
          margin-left: 0 !important;
        }
      }
    }
</style>
