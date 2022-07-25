<script lang="ts">
  export let width: string;
  export let height: string;
  export let borderRadius: string;
</script>

<div class="image" style="width: {width}; height: {height}; border-radius">

</div>

<style lang="scss">
  .image {
    background-color: $bg-black-21;
  }
</style>