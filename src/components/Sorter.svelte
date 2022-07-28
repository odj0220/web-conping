<script lang="ts">
  import Icon from './icons/Icon.svelte';

  export let sort: string;
  export let onClick: () => void;
</script>

<div class="sorter" on:click={() => onClick()}>
  <Icon name="sort" />
  <span class="sort">{sort}</span>
</div>

<style lang="scss">
  .sorter {
    padding: 0 1.6rem;
    display: flex;
    align-items: center;
    white-space: nowrap;
    height: 5.2rem;
    border-bottom: 1px solid $bg-gray-32;
    .sort {
      margin-left: 0.4rem;
      @include caption2-400;
    }
  }
</style>
