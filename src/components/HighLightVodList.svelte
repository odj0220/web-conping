<script lang="ts">
    import HighLightItem from './HighLightVodItem.svelte';
    import {onMount} from "svelte";

    export let contents: any[] = [];

    onMount(() => {
        console.log(contents);
    });
</script>

<section>
    {#each contents as content}
        <HighLightItem content={content}></HighLightItem>
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
