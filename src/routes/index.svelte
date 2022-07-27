<script>
  import GlobalBlock from '$component/common/layout/GlobalBlock.svelte';
  import MainHeaderContainer from '$container/MainHeaderContainer.svelte';
  import MainBannerContainer from '$container/MainBannerContainer.svelte';
  import MainViewingVideosContainer from '$container/MainViewingVideosContainer.svelte';
  import PopularVideoContainer from '$container/PopularVideoContainer.svelte';
  import MainOriginalContainer from '$container/MainOriginalContainer.svelte';
  import MainCelebsContainer from '$container/MainCelebsContainer.svelte';
  import SeriesVideoContainer from '$container/SeriesVideoContainer.svelte';
  import MainShortsContainer from '$container/MainShortsContainer.svelte';
  import MainVideosContainer from '$container/MainVideosContainer.svelte';
  import Footer from '$component/Footer.svelte';
</script>

<MainHeaderContainer />

<GlobalBlock>
  <MainBannerContainer/>
  <MainViewingVideosContainer/>
  <PopularVideoContainer/>
  <MainOriginalContainer />
  <MainCelebsContainer />
  <SeriesVideoContainer />
  <MainShortsContainer/>
  <MainVideosContainer/>
  <Footer/>
</GlobalBlock>
