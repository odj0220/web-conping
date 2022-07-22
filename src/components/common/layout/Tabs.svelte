<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  interface tabItem {
    label: string,
    index: number,
    component: SvelteComponent,
  }

  export let id: any;
  export let items: tabItem[];
  export let programTitle = '';
  export let borderBottom = false;
  export let sticky = false;

  $: selectedTab = items[0];
  
  function onActiveTabitem(tabItem: tabItem) {
    selectedTab = tabItem;
  }

</script>

<div class="tab-container">
  <ul class="tab-header" class:borderBottom={borderBottom} class:sticky={sticky}>
    {#each items as item, i}
      <li class={`tab-item ${selectedTab.index === i ? 'active' : ''}`} on:click={onActiveTabitem(item)}>
        {item.label}
      </li>
    {/each}
  </ul>

  <div class="tab-contents">
    <svelte:component this={selectedTab.component} {id} {programTitle}/>
  </div>
</div>

<style lang="scss">
.tab-container {
  position: relative;
  padding: 0 0 4rem;
  
  .tab-header {
    display: flex;
    padding: 0 1.6rem;
    margin-bottom: 2.4rem;
    &.borderBottom {
      border-bottom: 1px solid $bg-gray-32;
      margin-bottom: 4rem;
    }
    &.sticky {
      position: sticky;
      top: 5.4rem;
      background-color: $default-black;
      z-index: 100;
      padding-top: 1.7rem;
    }
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
    // padding: 0 1.6rem;
  }
}
</style>
