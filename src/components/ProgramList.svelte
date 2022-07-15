<script lang="ts">
import type { Program } from 'src/global/types';
import ProgramItem from './ProgramItem.svelte';

export let programs: Program[] = [];
export let type: string;
export let onClick: (id: string) => void;
</script>

<ul class="list" class:horizontal={type === 'horizontal'}>
  {#each programs as program}
    <ProgramItem {program} {onClick} />
  {/each}
</ul>

<style lang="scss">
  .list {
    @include horizontalScroll(1.2rem, 1.6rem);
  }
</style>
