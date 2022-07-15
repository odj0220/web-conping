<script lang="ts">
export let marginTop = '8px';
export let type = '';
export let title = '';
</script>

<section class="container {type}" style="margin-top: {marginTop};">
  {#if title}
    <h3 class="title">{title}</h3>
  {/if}
  <slot></slot>  
</section>

<style lang="scss">
  @import "../../../styles/variables.scss";

  .container {
    padding: 0 1.6rem;
    &.grayBox {
      border-radius: 0.4rem;
      background-color: $bg-black-21;
      padding: 1.6rem 1.2rem;
    }
    &.wide {
      padding: 1.6rem 0;
    }
  }
</style>