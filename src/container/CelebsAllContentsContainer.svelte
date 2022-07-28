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
  <CelebsProductContainer
          {id}
          title={[{ text: '상품' }]}
          moreButton={true}
          {category}
          onClickMoreButton={onClickMoreButton}
  />
  <CelebsContentsContainer
          {id}
          {category}
          title={[{ text: '콘텐츠' }]}
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
  <CelebsYoutubeContainer {id} moreButton={true} {category}/>
  <CelebsInstagramContainer {id} moreButton={true} {category}/>
</GlobalBlock>
