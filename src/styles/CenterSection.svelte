<section>
  <slot />
</section>

<style lang="scss">
  @import '../styles/modules.scss';
  @import '../styles/variables.scss';
  section {
    margin: 4rem 1.6rem;
    padding: 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    background-color: $bg-black-21;
  }
</style>
