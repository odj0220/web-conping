<script lang="ts">
import Icon from './icons/Icon.svelte';

export let onClick: (type: string) => void;
export let title: string;
export let buttons: string[] = [];

</script>

<div class="header-wrapper">
  <div class="title-wrapper">
    {#if title}
      <div class="title">{title}</div>
    {:else}
      <Icon name="logo" />
    {/if}
  </div>
  <div class="button-wrapper">
    {#each buttons as button}
    <button
      type={button}
      on:click={() => onClick(button)}
    >
      <Icon name={button}/>
    </button>
    {/each}
  </div>
</div>

<style lang="scss">
  .header-wrapper {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5.4rem;
    padding: 0 1.2rem;
    padding-top: constant(safe-area-inset-top);
    padding-top: snv(safe-area-inset-top);
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 50;
    background-color: $default-black;
    .title {
      @include title1-700;
    }
  }
</style>
