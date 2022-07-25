<script>
  import MainHeaderContainer from '$container/MainHeaderContainer.svelte';

  import GlobalBlock from '$styles/GlobalBlock.svelte';
  
  import ShopContainer from '$container/ShopContainer.svelte';
  import Footer from '$component/Footer.svelte';
</script>

<GlobalBlock>
  <MainHeaderContainer title="쇼핑존" />
  <ShopContainer />
  <Footer/>
</GlobalBlock>
