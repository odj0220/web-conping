<script lang="ts">
  import type { IProgram } from 'src/global/types';

  import ProgramItem from './ProgramItem.svelte';

  export let programs: IProgram[] = [];
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
    display: flex;
  }
</style>
