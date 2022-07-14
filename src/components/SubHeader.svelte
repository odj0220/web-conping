<script lang="ts">
  import Icon from './icons/Icon.svelte';

  export let onClick: (type: string) => void;
  export let title: string;
  export let share: boolean;
</script>

<div class="header-wrapper">
  <div class="left-wrapper">
    <button
      type="button"
      on:click={() => onClick('back')}
    >
      <Icon name="back"/>
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
  @import '../styles/variables.scss';

  .header-wrapper {
    display: flex;
    align-items: center;
    height: 5.4rem;
    position: sticky;
    top: 0;
    z-index: 50;
    background-color: $default-black;

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
    }
  }
</style>
