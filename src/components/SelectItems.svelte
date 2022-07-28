<script lang="ts">
  import type { ISelectItem } from 'src/global/types';

  import SelectItem from './SelectItem.svelte';

  export let selected: string;
  export let selectItems: ISelectItem[];
  export let onClickSelectButton: (e, sortField: string) => void;
</script>

<ul>
  {#each selectItems as selectItem }
    <SelectItem
      {selectItem}
      {selected}
      {onClickSelectButton}
    />
  {/each}
</ul>

<style lang="scss">
  ul {
    display: flex;
    flex-direction: column;
    padding-top: 0.7rem;
  }
</style>
