<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  interface tabItem {
    label: string,
    value: number,
    component: SvelteComponent,
    props: any,
  }

  export let items: tabItem[];
  export let activeTabValue = 1;
  export let programTitle: string;

  let selectedComponent: SvelteComponent = items[0].component;
  let selectedProps = { ...items[0].props, programTitle };

  async function onActiveTabitem(tabItem: tabItem) {
    onUpdateActiveTabValue(tabItem.value);
    onUpdateSelectedComponent(tabItem.component);
    onUpdateSelectedProps(tabItem.props);
  }

  function onUpdateActiveTabValue(tabValue: number) {
    activeTabValue = tabValue;
  }

  function onUpdateSelectedComponent(component: SvelteComponent) {
    selectedComponent = component;
  }

  function onUpdateSelectedProps(props: any) {
    selectedProps = { ...props, programTitle };
  }

</script>

<ul class="tab-conatainer">
  {#each items as item}
    <li class={activeTabValue === item.value ? 'active' : ''}>
      <span class="tab-item" on:click={onActiveTabitem(item)}>{item.label}</span>
    </li>
  {/each}
</ul>

<div class="contents-container">
      <svelte:component this={selectedComponent} {...selectedProps}/>
</div>

<style lang="scss">
  .tab-conatainer {
    display: flex;
    flex-wrap: nowrap;
    gap: 2rem;
    padding: 2.4rem 1.6rem 0;

    li {
      display: flex;

      .tab-item {
        flex: 1;
        padding: 0.6rem;
        font-size: 1.6rem;
      }
    }
    
    .active {
      font-weight: 700;
      border-bottom: 3px solid #dee2e6;
    }
  }
  
  .contents-container {
    display: flex;
    flex: 1;
    padding: 2.4em 1.6rem;
	}
</style>
