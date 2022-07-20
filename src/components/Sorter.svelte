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
    padding: 0.8rem 0;
    display: flex;
    align-items: center;
    .sort {
      margin-left: 0.4rem;
      @include caption2-400;
    }
  }
</style>
