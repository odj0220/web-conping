<script type="ts">
  import Bar from './Bar.svelte';
  import Circle from './Circle.svelte';

</script>

<div class="item">
  <Circle size={8} margin="0 0 0.4rem" />
  <Bar margin="0 0 0.4rem" height="1.4rem" line={2} width="10rem" />
  <Bar margin="0 0 1.6rem" height="1.4rem" line={2} width="8rem" />
</div>

<style lang="scss">
  .item {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
</style>