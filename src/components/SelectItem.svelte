<script lang="ts">
  import type { ISelectItem } from 'src/global/types';

  import Icon from './icons/Icon.svelte';

  export let selected: string;
  export let selectItem: ISelectItem;
  export let onClickSelectButton: (e, sortField: string) => void;

  $:name = selectItem.name;
  $:value = selectItem.value;
  $:isSelected = selected === value;
</script>

<li on:click={(e) => onClickSelectButton(e, value)}>
  <span class={isSelected ? 'selected' : '' }>
    {name}
  </span>
  {#if isSelected}
    <Icon name="check" />
  {/if}
</li>

<style lang="scss">
  li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 3.6rem;
    font-size: 1.4rem;
    padding: 0 1.2rem;
    border-radius: 0.4rem;
    &:active {
      background-color: #9E04EA;
    }

    span {
      &.selected {
        color: $primary-40;
      }
    }
  }
</style>
