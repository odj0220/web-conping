<script lang="ts">
  export let imagePath = '';
</script>

<section>
  <img
    src={imagePath}
    alt="프로그램 배너 이미지"
  />
</section>

<style lang="scss">
  section {
    border-radius: 4px;
    overflow: hidden;
    margin: 0.8rem 1.6rem;
    height: 0;
    padding-bottom: 141%;
    position: relative;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
</style>
