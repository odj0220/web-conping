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
    margin: 0 1.6rem;
    padding: 1.6rem 0;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    border-radius: 0.4rem;
    background-color: $bg-black-21;
    
    &.transparency {
      background-color: transparent;
    }
  }
</style>
