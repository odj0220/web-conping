<script lang="ts">
import type { SvelteComponent } from 'svelte';

interface tabItem {
  label: string,
  index: number,
  component: SvelteComponent,
  props: any,
}

export let items: tabItem[];
export let programTitle = '';
export let borderBottom = false;

let activeTabIndex = 0;
$: selectedTab = items[activeTabIndex];
$: selectedProps = { ...selectedTab.props, programTitle };

async function onActiveTabitem(tabItem: tabItem) {
  selectedTab = tabItem;
}

</script>

<div class="tab-conatainer">
  <ul class="tab-header">
    {#each items as item, i}
      <li class={`tab-item ${i} ${selectedTab.index === i ? 'active' : ''}`} on:click={onActiveTabitem(item)}>
        {item.label}
      </li>
    {/each}
  </ul>

  <div class="tab-contents">
    <svelte:component this={selectedTab.component} {...selectedProps}/>
  </div>
</div>

<style lang="scss">
.tab-conatainer {
  gap: 2rem;
  padding: 0 0 3.3rem;
  .tab-header {
    display: flex;
    padding: 0 1.6rem;
    margin-bottom: 2.4rem;
    .tab-item {
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
  .tab-contents {
    padding: 0 1.6rem;
  }
}
</style>
