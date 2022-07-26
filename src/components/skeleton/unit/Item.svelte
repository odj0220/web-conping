<script lang="ts">
  export let marginRight = '0';
  export let align = 'right';
</script>

<div class="item" style="margin-right: {marginRight}; align: {align}">
  <slot></slot>
</div>

<style lang="scss">
  .item {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
</style>