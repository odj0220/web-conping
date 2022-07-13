<script lang="ts">
  export let type: string;
</script>

<section class={type}>
  <slot />
</section>

<style lang="scss">
  @import '../styles/modules.scss';
  @import '../styles/variables.scss';

  section {
    margin: 2rem 1.6rem 0 1.6rem;
    display: flex;
    flex-direction: column;
    border-radius: 0.4rem;
    background-color: $bg-black-21;

    &.transparency {
      background-color: transparent;
    }

    &.inner {
      padding: 1.6rem 0 2.6rem 1.2rem;
    }
  }
</style>
