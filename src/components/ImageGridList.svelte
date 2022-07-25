<script lang="ts">
  import Thumbnail from './common/shared/Thumbnail.svelte';

  export let data: any[] = [];

</script>

<ul class="image-grid-list">
  {#each data as item}
    <li class="image-grid-item">
      <Thumbnail src={item} width="100%" height="100%"/>
    </li>
  {/each}
</ul>

<style lang="scss">
  .image-grid-list {
    @include gridItem(1.2rem, 1.2rem);
    margin-bottom: 1.6rem;
  }
</style>