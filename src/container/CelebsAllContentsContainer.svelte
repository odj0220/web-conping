<script lang="ts">
  import type { ITabItem } from '../global/types';
  import CelebsProductContainer from './CelebsProductContainer.svelte';
  import CelebsContentsContainer from './CelebsContentsContainer.svelte';
  import CelebsShortsContainer from './CelebsShortsContainer.svelte';
  import CelebsYoutubeContainer from './CelebsYoutubeContainer.svelte';
  import CelebsInstagramContainer from './CelebsInstagramContainer.svelte';
  import GlobalBlock from '$component/common/layout/GlobalBlock.svelte';

  export let id = '';
  export let category = '';
  export let onClickMoreButton: (index: number) => void;
</script>

<GlobalBlock>
  <CelebsProductContainer {id} title={[{ text: '상품' }]} moreButton={true} {category}/>
  <CelebsContentsContainer
          {id}
          {category}
          title={[{ text: `${category}님의 유튜브` }]}
          moreButton={true}
          onClickMoreButton={onClickMoreButton}
  />
  <CelebsShortsContainer
          {id}
          {category}
          title={[{ text: '쇼츠' }]}
          moreButton={true}
          onClickMoreButton={onClickMoreButton}
  />
  <CelebsYoutubeContainer {id}  title={[{ text: '서울리안 유튜브' }]} moreButton={true} {category}/>
  <CelebsInstagramContainer {id} title={[{ text: '서울리안 인스타그램' }]} moreButton={true} {category}/>
</GlobalBlock>
