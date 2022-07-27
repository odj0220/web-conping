<script lang="ts">
  import type { ITabItem } from 'src/global/types';

  import Tab from './Tab.svelte';

  export let tabItems: ITabItem[];
  export let onClickTab: (selected: ITabItem) => void;
  export let borderBottom = false;
  export let sticky = false;
  export let selectedTab = tabItems[0];
</script>

<ul class="tab-header" class:sticky={sticky} class:borderBottom={borderBottom}>
  {#each tabItems as item}
    <Tab 
      {item}
      isActive={selectedTab.index === item.index}
      {onClickTab}
    />
  {/each}
</ul>

<style lang="scss">
  .tab-header {
    display: flex;
    padding: 0 1.6rem;

    &.borderBottom {
      border-bottom: 1px solid $bg-gray-32;
    }
    &.sticky {
      position: sticky;
      top: 5.4rem;
    }
  }
</style>
