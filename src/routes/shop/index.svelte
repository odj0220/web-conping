<script>
  import GlobalBlock from '$component/common/layout/GlobalBlock.svelte';
  
  import MainHeaderContainer from '$container/MainHeaderContainer.svelte';
  import ShopContainer from '$container/ShopContainer.svelte';
  import Footer from '$component/Footer.svelte';
</script>

<GlobalBlock>
  <MainHeaderContainer title="쇼핑존" />
  <ShopContainer />
</GlobalBlock>
<Footer/>
