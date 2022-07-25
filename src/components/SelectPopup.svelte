<script lang="ts">
  import type { ISelectItem } from 'src/global/types';
  
  import SelectItems from './SelectItems.svelte';
  import Button from './Button.svelte';

  export let title: string;
  export let selected: string;
  export let selectItems: ISelectItem[];
  export let onClickSelectButton: (sortField: string) => void;
  export let onClickCloseButton: () => void;
</script>

<div class="container">
  <h1 class="title">{title}</h1>

  <SelectItems
    {selectItems}
    {selected}
    {onClickSelectButton}
  />

  <Button
    theme="none"
    buttonName="닫기"
    onClick={onClickCloseButton}
  />
</div>

<style lang="scss">
  .container {
    padding: 0 2.4rem;
    background-color: $bg-gray-32;
    border-radius: 0.8rem;
    display: flex;
    flex-direction: column;

    .title {
      font-weight: 700;
      font-size: 1.2rem;
      color: $disabled-8a;
      height: 6rem;

      display: flex;
      align-items: center;
    }
  }
</style>
