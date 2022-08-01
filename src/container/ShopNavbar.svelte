<script lang="ts">
  import Tabs from '$component/common/layout/Tabs.svelte';
  import HorizontalScroller from '$component/HorizontalScroller.svelte';
  import Sorter from '$component/Sorter.svelte';

  import type { ITabItem } from 'src/global/types';

  export let tabItems: ITabItem[];
  export let selectedTab: ITabItem;
  export let sort = '';
  export let onClickTab: (selectedIndex: number) => void;
  export let onClickSort: () => void;

  $:scrollToIndex = selectedTab?.index * 50 || 0;
</script>

<div class="header">
  <div class="header-item tabs">
    <HorizontalScroller {scrollToIndex}>
      <Tabs
        {tabItems}
        {selectedTab}
        {onClickTab}
        borderBottom={true}
        gap="1.6rem"
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
    display: flex;
    align-items: center;
    width: 100%;
    .header-item {
      &.tabs {
        padding-top: 1.6rem;
        position: relative;
        &:after {
          content: "";
          width: 1.6rem;
          background-color: red;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 1px;
          background: linear-gradient(90deg, rgba(10, 10, 10, 0) 0%, #0A0A0A 100%);
        }
      }
    }
  }
</style>
