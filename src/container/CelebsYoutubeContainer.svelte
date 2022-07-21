<script lang="ts">
  import Container from '$component/common/layout/Container.svelte';
  import MoreButton from '$component/common/shared/MoreButton.svelte';
import PreviewVideos from '$component/PreviewVideos.svelte';
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
  <PreviewVideos contents={[]}/>
  {#if moreButton}
      <MoreButton value="유튜브 보러가기" onClick={onClickButton}/>
  {/if}
</Container>