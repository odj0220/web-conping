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
    padding: 0 1.6rem 3.3rem;

    li {
      display: flex;

      .tab-item {
        @include body1-400;
        flex: 1;
        color: $disabled-8a;
        position: relative;
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
      }
      &.active {
        .tab-item{
          @include body1-700;
          color: $text-white-f2;
          &:after {
            left: 0;
            width: 100%;
          }
        }
      }
    }
    
  
  }
  
  .contents-container {
    display: flex;
    flex: 1;
    padding: 0 1.6rem;
	}
</style>
