<script lang="ts">
  import Image from './common/shared/Image.svelte';

  export let src = '';
  export let alt = '';
</script>

<section>
  <Image src={src} alt={alt} height="auto" defaultHeight="141%" />
</section>

<style lang="scss">
  section {
    border-radius: 4px;
    overflow: hidden;
    margin: 0.8rem 1.6rem;
  }
</style>
