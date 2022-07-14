<script lang="ts">
  import Icon from './icons/Icon.svelte';

  export let onClick: (type: string) => void;
  export let title = '';
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
  <div class="right-wrapper">
    <button
      type="button"
      on:click={() => onClick('share')}
    >
      <Icon name="share" />
    </button>
  </div>
</div>

<style lang="scss">
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
