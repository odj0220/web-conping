<script lang="ts">
  export let margin = '0';
  export let align = 'center';
  export let display = 'block';
  export let direction = 'column';
</script>

<li class="item" style="display:{display}; margin: {margin}; align-items: {align}; flex-direction:{direction}">
  <slot></slot>
</li>

<style lang="scss">
  .item {
    display: flex;
    flex-direction: column;
  }
</style>