<script lang="ts">
  export let src = '';
  export let alt = '';
  export let width = '';
  export let height = '';
</script>

<div class="thumbnail" style="width: {width}; padding-bottom: {height}">
  <img src={src} alt={alt} />
</div>

<style lang="scss">
.thumbnail {
  position: relative;
  border-radius: 0.4rem;
  overflow: hidden;
  background-color: gray;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>