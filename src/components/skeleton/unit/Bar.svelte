<script lang="ts">
  export let margin: string;
  export let width = '10rem';
  export let height: string;
  export let line = 1;

</script>

<div class="bar" style="margin: {margin}; width:{width}; height: {height}"></div>

<style lang="scss">
  .bar {
    background-color: $bg-gray-32;
    height: 20px;
    width: 100px;
    border-radius: 0.4rem;
  }
</style>