<script>
  import GlobalBlock from '$styles/GlobalBlock.svelte';
  import CelebsProductContainer from './CelebsProductContainer.svelte';
  import CelebsContentsContainer from './CelebsContentsContainer.svelte';
  import CelebsShortsContainer from './CelebsShortsContainer.svelte';
  import CelebsYoutubeContainer from './CelebsYoutubeContainer.svelte';
  import CelebsInstagramContainer from './CelebsInstagramContainer.svelte';

  export let id = '';

</script>

<GlobalBlock>
{#key id}
  <CelebsProductContainer {id} title={[{ text: '상품' }]} moreButton={true} />
  <CelebsContentsContainer {id} title={[{ text: '콘텐츠' }]} moreButton={true}/>
  <CelebsShortsContainer {id} title={[{ text: '쇼츠' }]} moreButton={true} />
  <CelebsYoutubeContainer {id}  title={[{ text: '서울리안 유튜브' }]} moreButton={true} />
  <CelebsInstagramContainer {id} title={[{ text: '서울리안 인스타그램' }]} moreButton={true}/>
{/key}
</GlobalBlock>
