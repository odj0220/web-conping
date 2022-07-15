<script>
  import GlobalBlock from '$styles/GlobalBlock.svelte';
  
  import MainHeaderContainer from '$component/MainHeaderContainer.svelte';
  import MainBannerContainer from '$component/MainBannerContainer.svelte';
  import MainViewingVideosContainer from '$component/MainViewingVideosContainer.svelte';
  import PopularVideoContainer from '$component/PopularVideoContainer.svelte';
  import MainOriginalContainer from '$component/MainOriginalContainer.svelte';
  import SeriesVideoContainer from '$component/SeriesVideoContainer.svelte';
  import MainShortsContainer from '$component/MainShortsContainer.svelte';
  import MainVideosContainer from '$component/MainVideosContainer.svelte';
</script>
    
<MainHeaderContainer />
    
<GlobalBlock>
  <MainBannerContainer/>
  <MainViewingVideosContainer/>
  <PopularVideoContainer/>
  <MainOriginalContainer />
  <SeriesVideoContainer />
  <MainShortsContainer/>
  <MainVideosContainer/>
</GlobalBlock>
