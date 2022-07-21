<script lang="ts">
  import Thumbnail from './common/shared/Thumbnail.svelte';

</script>

<ul class="image-grid-list">
  <li class="image-grid-item">
    <Thumbnail width="100%" height="100%"/>
  </li>
  <li class="image-grid-item">
    <Thumbnail width="100%" height="100%"/>
  </li>
  <li class="image-grid-item">
    <Thumbnail width="100%" height="100%"/>
  </li>
  <li class="image-grid-item">
    <Thumbnail width="100%" height="100%"/>
  </li>
  <li class="image-grid-item">
    <Thumbnail width="100%" height="100%"/>
  </li>
  <li class="image-grid-item">
    <Thumbnail width="100%" height="100%"/>
  </li>
</ul>

<style lang="scss">
  .image-grid-list {
    @include gridItem(1.2rem, 1.2rem);
    margin-bottom: 1.6rem;
  }
</style>