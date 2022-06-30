<script lang="ts">
    import ShortItem from './ShortItem.svelte';
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
</script>

{#each arr as item}
    <ShortItem></ShortItem>
{/each}

<style lang="scss">

</style>
