<script lang="ts">
  import Icon from './icons/Icon.svelte';

  export let onClick: (type: string) => void;
  export let title: string;
  export let share: boolean;
  export let type = '';
  export let color : false;

</script>

<div class={`header-wrapper ${type}`} class:color={color}>
  <div class="left-wrapper">
    <button
      type="button"
      on:click={() => onClick('back')}
    >
      <Icon name="back" />
    </button>
  </div>
  <div class="title-wrapper">
    <div class="title">{title}</div>
  </div>
  {#if share}
  <div class="right-wrapper">
    <button
      type="button"
      on:click={() => onClick('share')}
    >
      <Icon name="share" />
    </button>
  </div>
  {/if}
  
</div>

<style lang="scss">
  .header-wrapper {
    display: flex;
    align-items: center;
    height: 5.4rem;
    position: sticky;
    top: 0;
    z-index: 50;
    background-color: $default-black;
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
    transition: all 0.3s;
    &.transparent {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background-color: transparent;
      &.color {
        background-color: $default-black;
      }
    }
    .left-wrapper {
      position: absolute;
      left: 1.2rem;
    }
    .title-wrapper {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    .right-wrapper {
      position: absolute;
      right: 1.2rem;
    }
    .title {
      @include body1-700;
      @include ellipsis(1);
    }
  }
</style>
