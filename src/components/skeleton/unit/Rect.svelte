<script lang="ts">
  export let width = 'auto';
  export let height = 'auto';
  export let borderRadius = '0';
  export let padding = '0';
  export let margin = '0';
  export let bgColor = 'transparent';
  export let flex = false;

</script>

<div
class={`rect ${bgColor}`}
class:flex={flex}
 style="width: {width}; height: {height}; border-radius:{borderRadius}; padding:{padding}; margin:{margin}">
  <slot></slot>
</div>

<style lang="scss">
  .rect {
    position: relative;
    background-color: $bg-black-21;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    &.bg-black-21 {
      background-color: $bg-black-21;
    }
    &.bg-gray-32 {
      background-color: $bg-gray-32;
    }
    &.flex {
      flex-direction: row;
      align-items: center;
    }
  }
</style>
