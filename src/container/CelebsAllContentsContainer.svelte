<script>
  import GlobalBlock from '$styles/GlobalBlock.svelte';
  import CelebsProductContainer from './CelebsProductContainer.svelte';
  import CelebsContentsContainer from './CelebsContentsContainer.svelte';
  import CelebsShortsContainer from './CelebsShortsContainer.svelte';
  import CelebsYoutubeContainer from './CelebsYoutubeContainer.svelte';
  import CelebsInstagramContainer from './CelebsInstagramContainer.svelte';

</script>
<GlobalBlock>
  <CelebsProductContainer title={[{ text: '상품' }]} moreButton={true} />
  <CelebsContentsContainer title={[{ text: '콘텐츠' }]} moreButton={true}/>
  <CelebsShortsContainer title={[{ text: '쇼츠' }]} moreButton={true} />
  <CelebsYoutubeContainer title={[{ text: '서울리안 유튜브' }]} moreButton={true} />
  <CelebsInstagramContainer title={[{ text: '서울리안 인스타그램' }]} moreButton={true}/>
</GlobalBlock>
