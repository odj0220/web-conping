<script>
  import MainBannerContainer from '$component/MainBannerContainer.svelte';
  import MainHeaderContainer from '$component/MainHeaderContainer.svelte';
  import MainShortsContainer from '$component/MainShortsContainer.svelte';
  import MainViewingVideosContainer from '$component/MainViewingVideosContainer.svelte';
  import PopularVideoContainer from '$component/PopularVideoContainer.svelte';
  import SeriesVideoContainer from '$component/SeriesVideoContainer.svelte';

  import GlobalBlock from '$styles/GlobalBlock.svelte';
  import MainVideosContainer from '../components/MainVideosContainer.svelte';
</script>

<MainHeaderContainer />

<GlobalBlock>
  <MainBannerContainer/>
  <MainViewingVideosContainer/>
  <PopularVideoContainer/>
  <SeriesVideoContainer />
  <MainShortsContainer/>
  <MainVideosContainer/>
</GlobalBlock>
