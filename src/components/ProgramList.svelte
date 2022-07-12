<script lang="ts">
import Hscroller from './HorizontalScroller.svelte';
import ProgramItem from './ProgramItem.svelte';

export let data: any[] = [];
</script>

<Hscroller>
    <ul class="list">
        {#each data as el}
            <ProgramItem {...el}/>
        {/each}
    </ul>
</Hscroller>

<style lang="scss">
    .list {
        display: flex;
    }
</style>