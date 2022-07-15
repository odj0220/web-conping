<script lang="ts">
import { onMount, SvelteComponent } from 'svelte';
import { graphqlApi } from '../lib/_api_graphql';
import Container from './common/layout/Container.svelte';
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

<Container type="full">
  <svelte:component this={Banners} banners={banners}></svelte:component>
</Container>
