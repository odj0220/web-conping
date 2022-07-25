<script lang="ts">
  import type { ITabItem } from 'src/global/types';

  export let items: ITabItem[];
  export let onClickTab: (category: ITabItem) => void;
  export let selectedTab = items[0];

</script>

<ul>
  {#each items as item, index}
    <li
      class:active={selectedTab.index === index}
      on:click={onClickTab(item)}
    >
      {item.label}
    </li>
  {/each}
</ul>

<style lang="scss">
  ul {
    display: flex;
    padding: 0 1.6rem;
    margin-bottom: 2.4rem;
    border-bottom: 1px solid $bg-gray-32;
    margin-bottom: 4rem;

    li {
      @include body1-400;
      color: $disabled-8a;
      position: relative;
      transition: all 0.3s;
      padding-bottom: 0.8rem;

      &:not(:last-child) {
        margin-right: 2rem;
      }

      &:after {
        content: "";
        position: absolute;
        left: 50%;
        right: 0;
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
  }
</style>
