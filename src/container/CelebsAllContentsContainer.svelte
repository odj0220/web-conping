<script>
  import CelebsProductContainer from './CelebsProductContainer.svelte';
  import CelebsContentsContainer from './CelebsContentsContainer.svelte';
  import CelebsShortsContainer from './CelebsShortsContainer.svelte';
  import CelebsYoutubeContainer from './CelebsYoutubeContainer.svelte';
  import CelebsInstagramContainer from './CelebsInstagramContainer.svelte';
import GlobalBlock from '$component/common/layout/GlobalBlock.svelte';

  export let id = '';
  export let category = '';

</script>

<GlobalBlock>
{#key id}
  <CelebsProductContainer {id} title={[{ text: '상품' }]} moreButton={true} {category}/>
  <CelebsContentsContainer {id} title={[{ text: '콘텐츠' }]} moreButton={true} {category}/>
  <CelebsShortsContainer {id} title={[{ text: '쇼츠' }]} moreButton={true} {category}/>
  <CelebsYoutubeContainer {id}  title={[{ text: '서울리안 유튜브' }]} moreButton={true} {category}/>
  <CelebsInstagramContainer {id} title={[{ text: '서울리안 인스타그램' }]} moreButton={true} {category}/>
{/key}
</GlobalBlock>
