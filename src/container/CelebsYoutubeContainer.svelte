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
  let url;

  const onClickButton = () => {
    openBrowser(url);
  };

  const gotoYoutube = (videoId: string) => {
    openBrowser(`https://www.youtube.com/watch?v=${videoId}`);
  };


  const getData = async () => {
    const query = `{
      getYoutubeContentsByCelebId (id: "${id}") {
        title {
          text
        }
        contents {
          id
          title
          description
          videoId
          duration
          createDt
          views
          thumb
        }
        url
      }
    }`;
  
    const { data: { getYoutubeContentsByCelebId } } = await graphqlApi(query);
    url = getYoutubeContentsByCelebId.url;

    return getYoutubeContentsByCelebId;
  };


</script>

{#await getData()}
{:then data} 
{#if data?.contents.length}
  <Container margin="5.6rem 0 0">
    <Title title={data.title} />
    <PreviewVideos contents={data.contents} onClick={gotoYoutube}/>

    {#if moreButton}
      <MoreButton value="유튜브 보러가기" onClick={onClickButton}/>
    {/if}
    
  </Container>
{/if}
{/await}
