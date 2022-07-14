<script lang="ts">
import Icon from './icons/Icon.svelte';

export let sorter;
export let sort: string;
</script>

<div class="sorter">
  <Icon name="sort" />
  <span class="sort">{sort}</span>
</div>

<style lang="scss">
  @import "../styles/variables.scss";
  
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