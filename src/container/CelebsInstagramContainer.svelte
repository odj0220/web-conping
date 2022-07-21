<script lang="ts">
  import Container from '$component/common/layout/Container.svelte';
  import MoreButton from '$component/common/shared/MoreButton.svelte';
  import ImageGridList from '$component/ImageGridList.svelte';
  import Title from '$component/Title.svelte';
import { openBrowser } from '$lib/util';
  
  import type { TitleElement } from 'src/global/types';

  export let moreButton: boolean;
  export let title : TitleElement[] = [];

  const onClickButton = () => {
    openBrowser('https://www.naver.com');
  };

</script>
<Container type="full">
  <Title title={title} />
  <ImageGridList />
  {#if moreButton}
    <MoreButton value="인스타그램 보러가기" onClick={onClickButton}/>
  {/if}
</Container>