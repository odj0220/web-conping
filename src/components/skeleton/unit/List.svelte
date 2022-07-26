<script lang="ts">

  export let direction = 'row';
</script>

<ul class="list" style="flex-direction: {direction}">
  <slot></slot>
</ul>

<style lang="scss">
  .list {
    display: flex;
    width: 100%;
  }
</style>