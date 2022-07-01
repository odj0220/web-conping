<script lang="ts">
    import HighLightItem from './HighLightVodItem.svelte';
    import {onMount} from "svelte";

    export let contents: any[] = [];

    onMount(() => {
        console.log(contents);
    });
</script>

{#each contents as content}
    <HighLightItem></HighLightItem>
{/each}

<style lang="scss">

</style>
