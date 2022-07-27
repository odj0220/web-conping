<script lang="ts">
  import Tabs from '$component/common/layout/Tabs.svelte';
  import HorizontalScroller from '$component/HorizontalScroller.svelte';
  import Sorter from '$component/Sorter.svelte';

  import type { ITabItem } from 'src/global/types';

  export let tabItems: ITabItem[];
  export let selectedTab: ITabItem;
  export let sort = '';
  export let onClickTab: (selectedTab: ITabItem) => void;
  export let onClickSort: () => void;
  
  $:scrollToIndex = selectedTab?.index * 50 || 0;
</script>

<div class="header">
  <div class="header-item">
    <HorizontalScroller {scrollToIndex}>
      <Tabs
        {tabItems}
        {selectedTab}
        {onClickTab}
      />
    </HorizontalScroller>
  </div>
  <div class="header-item">
    <Sorter
      sort={sort}
      onClick={onClickSort}
    />
  </div>
</div>

<style lang="scss">
  .header {
    position: sticky;
    top: 10;
    display: grid;
    grid-template-columns: 3fr 1fr;
    height: 5.2rem;

    .header-item {
      height: 5.2rem;
    }
  }
</style>
