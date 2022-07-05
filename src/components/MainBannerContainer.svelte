<script lang="ts">
  import { onMount, SvelteComponent } from 'svelte';
  let Banners: SvelteComponent;

  onMount(async () => {
    const module = await import('./Banners.svelte');
    Banners = module.default;
  });
</script>

<section>
    <svelte:component this={Banners}></svelte:component>
</section>

<style lang="scss">
    section {
      margin-bottom: 2rem;
      min-height: 32.8rem;
    }
</style>
