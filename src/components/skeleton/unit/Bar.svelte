<script lang="ts">
  export let margin = '0';
  export let width = '10rem';
  export let height = '0';
  export let bgColor = 'bg-black-32';

</script>

<div class={`bar ${bgColor}`} style="margin: {margin}; width:{width}; height: {height}"></div>

<style lang="scss">
  .bar {
    background-color: $bg-gray-32;
    height: 20px;
    width: 100px;
    border-radius: 0.4rem;
    flex-shrink: 0;
    background-color: $bg-gray-32;
    &.bg-black-21 {
      background-color: $bg-black-21;
    }
  }
</style>