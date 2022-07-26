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
    img {
      width: 100%;
    }

  }
</style>
