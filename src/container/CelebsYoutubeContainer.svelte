<script lang="ts">
  import { graphqlApi } from '$lib/_api';

  import { openBrowser } from '$lib/util';
  import { gotoContents } from '$lib/utils/goto';
  
  import Container from '$component/common/layout/Container.svelte';
  import MoreButton from '$component/common/shared/MoreButton.svelte';
  import PreviewVideos from '$component/PreviewVideos.svelte';
  import Title from '$component/Title.svelte';

  import type { TitleElement } from 'src/global/types';

  export let id: string;
  export let moreButton: boolean;
  export let title : TitleElement[] = [];
  export let category: string;

  const onClickButton = () => {
    openBrowser('https://www.naver.com');
  };


  const getData = async () => {
    const query = `{
      getSocialsByCelebId (id: "${id}", type: youtube) {
        id
        type
        board_thumbnails
        link
      }
    }`;
  
    const { data: { getSocialsByCelebId } } = await graphqlApi(query);

    return getSocialsByCelebId[0];
  };


</script>

{#await getData()}
{:then data} 
{#if data?.length}
  <Container margin="5.6rem 0 0">
    <Title title={title} />
    <PreviewVideos contents={data} onClick={gotoContents}/>

    {#if moreButton}
      <MoreButton value="유튜브 보러가기" onClick={onClickButton}/>
    {/if}
    
  </Container>
{/if}
{/await}