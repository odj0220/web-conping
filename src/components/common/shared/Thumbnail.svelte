<script lang="ts">
export let src: string;
export let width: string;
export let height: string;
</script>

<div class="thumbnail" style="width: {width}; height: {height}">
  <img src={src} alt="썸네일 이미지" />
</div>

<style lang="scss">
.thumbnail {
  border-radius: 0.4rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>