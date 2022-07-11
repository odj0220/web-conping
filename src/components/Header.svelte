<script lang="ts">
  import Icon from './icons/Icon.svelte';

  export let onClick: (type: string) => void;
  export let title: string;
</script>

<div class="header-wrapper">
  <div class="title-wrapper">
    {#if title }
      <div class="title">{title}</div>
    {:else}
      <Icon name="logo" />
    {/if}
    
  </div>
  <div class="button-wrapper">
    <button
      type="button"
      on:click={() => onClick('noti')}
    >
      <Icon name="noti"/>
    </button>
    <button
      type="button"
      on:click={() => onClick('setting')}
    >
      <Icon name="setting" />
    </button>
  </div>
</div>

<style lang="scss">
  @import '../styles/variables.scss';

  .header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5.4rem;
    padding: 0 1.6rem;
    position: sticky;
    top: 0;
    z-index: 50;
    background-color: $default-black;

    .title {
      @include title1-700
    }
  }
</style>
