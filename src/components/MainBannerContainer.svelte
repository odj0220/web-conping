<script lang="ts">
  import { onMount, SvelteComponent } from 'svelte';
  import { graphqlApi } from '../lib/_api';
  let Banners: SvelteComponent;

  let banners = [];

  onMount(async () => {
    await loadBannersComponenrt();
    await loadBannersData();
  });

  async function loadBannersComponenrt() {
    const module = await import('./Banners.svelte');
    Banners = module.default;
  }

  async function loadBannersData() {
    const query = '{getBanners{title imgPath link}}';
    const { data: { getBanners } } = await graphqlApi(query);
    banners = getBanners;
  }
</script>

<section>
    <svelte:component this={Banners} banners={banners}></svelte:component>
</section>

<style lang="scss">
    section {
      min-height: 32.8rem;
    }
</style>
