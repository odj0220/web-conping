<script lang="ts">
export let margin = '8px 0 0 ';
export let type = '';
export let title = '';
</script>

<section class="container {type}" style="margin: {margin};">
  {#if title}
    <h3 class="title">{title}</h3>
  {/if}
  <slot></slot>  
</section>

<style lang="scss">
  @import "../../../styles/variables.scss";

  .container {
    padding: 0 1.6rem;
    box-sizing: border-box;
    width: 100%;
    &.grayBox {
      border-radius: 0.4rem;
      background-color: $bg-black-21;
      padding: 1.6rem 1.2rem;
    }
    &.wide {
      padding: 1.6rem 0;
    }
    &.full {
      padding: 0;
    }
  }
</style>