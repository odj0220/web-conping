<script lang="ts">
import Hscroller from './HorizontalScroller.svelte';
import ProgramItem from './ProgramItem.svelte';

export let data: any[] = [];
export let type: string;
</script>

<Hscroller>
    <ul class="list" class:horizontal={type === 'horizontal'}>
        {#each data as el}
            <ProgramItem {...el}/>
        {/each}
    </ul>
</Hscroller>

<style lang="scss">
    .list {
        display: flex;
        &.horizontal {
            padding: 0 1.6rem;
        }
    }
</style>