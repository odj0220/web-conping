<script>
  import GlobalBlock from '$styles/GlobalBlock.svelte';
  import CelebsContentsContainer from './CelebsContentsContainer.svelte';
  import CelebsInstagramContainer from './CelebsInstagramContainer.svelte';
  import CelebsProductContainer from './CelebsProductContainer.svelte';
  import CelebsShortsContainer from './CelebsShortsContainer.svelte';
  import CelebsYoutubeContainer from './CelebsYoutubeContainer.svelte';

</script>
<GlobalBlock>
  <CelebsProductContainer  title={[{ text: '상품' }]} />
  <CelebsContentsContainer  title={[{ text: '콘텐츠' }]} />
  <CelebsShortsContainer  title={[{ text: '쇼츠' }]} />
  <CelebsYoutubeContainer  title={[{ text: '서울리안 유튜브' }]} />
  <CelebsInstagramContainer  title={[{ text: '서울리안 인스타그램' }]} moreButton={true}/>
</GlobalBlock>
