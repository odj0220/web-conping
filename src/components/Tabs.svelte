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

  const handleClick = (tabValue : number) => () => (activeTabValue = tabValue);
</script>

<ul class="tab-conatainer">
  {#each items as item}
    <li class={activeTabValue === item.value ? 'active' : ''}>
      <span class="tab-item" on:click={handleClick(item.value)}>{item.label}</span>
    </li>
  {/each}
</ul>

{#each items as item}
	{#if activeTabValue === item.value}
    <div class="contents-container">
      <svelte:component this={item.component} {...item.props}/>
    </div>
	{/if}
{/each}

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
