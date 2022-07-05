<script lang="ts">
  import { onMount, SvelteComponent } from 'svelte';
  import MainBannerContainer from './MainBannerContainer.svelte';

  let Banners: SvelteComponent;

  onMount(async () => {
    const module = await import('./Banners.svelte');
    Banners = module.default;
  });
</script>

<h1>Main Banner Container</h1>
<section>
    <svelte:component this={Banners}></svelte:component>
</section>

<style lang="scss">
</style>
