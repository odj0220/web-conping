<script lang="ts">
  import Tabs from '$component/common/layout/Tabs.svelte';
  import HorizontalScroller from '$component/HorizontalScroller.svelte';
  import Sorter from '$component/Sorter.svelte';

  export let items = [];
  export let sort = '';
  export let onClickTab: (category: string) => void;
  export let onClickSort: () => void;
</script>

<div class="header">
  <div class="header-item">
    <HorizontalScroller>
      <Tabs {items} {onClickTab} />
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
    display: grid;
    grid-template-columns: 3fr 1fr;
    height: 5.2rem;

    .header-item {
      height: 5.2rem;
    }
  }
</style>
