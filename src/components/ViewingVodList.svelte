<script lang="ts">
    import ViewingVodItem from './VewingVodItem.svelte';
    export let contents: any[] = [];
</script>

{#each contents.splice(0, 2) as content}
    <ViewingVodItem content={content}></ViewingVodItem>
{/each}


<style lang="scss"></style>
