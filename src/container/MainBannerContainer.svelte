<script lang="ts">
  import { graphqlApi } from '../lib/_api';

  import Container from '$component/common/layout/Container.svelte';
  import MainBannerSkeleton from '$component/skeleton/MainBannerSkeleton.svelte';

  async function loadBannersComponent() {
    const module = await import('$component/Banners.svelte');
    return module.default;
  }

  async function loadBannersData() {
    const query = '{getBanners{title imgPath link {to openBrowser}}}';
    const { data: { getBanners } } = await graphqlApi(query);
    return getBanners;
  }

  async function promises() {
    const component = await loadBannersComponent();
    const data = await loadBannersData();
    return { component, data };
  }

</script>

{#await promises()}
<MainBannerSkeleton />
{:then {component, data}}
<Container type="full">
  <svelte:component this={component} banners={data}></svelte:component>
</Container>
{/await}
