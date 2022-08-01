<script lang="ts">
  import type { ITabItem } from 'src/global/types';

  export let item: ITabItem;
  export let isActive: boolean;
  export let onClickTab: (selectedIndex: number) => void;
  export let gap = '0.8rem';
</script>

<li
style="padding-bottom: {gap};"
  class:active={isActive}
  on:click={() => onClickTab(item.index)}
>
  {item.label}
</li>

<style lang="scss">
  li {
    @include body1-400;
    color: $disabled-8a;
    position: relative;
    transition: all 0.3s;
    &:not(:last-child) {
      margin-right: 2rem;
    }

    &:after {
      content: "";
      position: absolute;
      left: 50%;
      right: 0;
      bottom: 0;
      display: block;
      width: 0;
      height: 3px;
      margin-top: 0.6rem;
      background-color: $text-white-f2;
      transition: all 0.3s;
    }

    &.active {
      @include body1-700;
      color: $text-white-f2;
      &:after {
        left: 0;
        width: 100%;
      }
    }
  }
</style>
