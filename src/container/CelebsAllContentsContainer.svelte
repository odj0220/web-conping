<script>
  import GlobalBlock from '$styles/GlobalBlock.svelte';
  import CelebsContentsContainer from './CelebsContentsContainer.svelte';
  import CelebsInstagramContainer from './CelebsInstagramContainer.svelte';
  import CelebsProductContainer from './CelebsProductContainer.svelte';
  import CelebsShortsContainer from './CelebsShortsContainer.svelte';
  import CelebsYoutubeContainer from './CelebsYoutubeContainer.svelte';

</script>
<GlobalBlock>
  <CelebsProductContainer />
  <CelebsContentsContainer />
  <CelebsShortsContainer />
  <CelebsYoutubeContainer />
  <CelebsInstagramContainer />
</GlobalBlock>
