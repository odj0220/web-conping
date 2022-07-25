<script lang="ts">
  import { graphqlApi } from '$lib/_api';
  
  import { openBrowser } from '$lib/util';
  
  import Container from '$component/common/layout/Container.svelte';
  import MoreButton from '$component/common/shared/MoreButton.svelte';
  import PreviewVideos from '$component/PreviewVideos.svelte';
  import Title from '$component/Title.svelte';

  import type { TitleElement } from 'src/global/types';

  export let moreButton: boolean;
  export let title : TitleElement[] = [];

  const onClickButton = () => {
    openBrowser('https://www.naver.com');
  };


  const getData = async () => {
    const query = `{
      getSocialsByCelebId (id: "celeb1", type: youtube) {
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
  <Container margin="5.6rem 0 0">
    <Title title={title} />
    <PreviewVideos contents={data}/>
    {#if moreButton}
        <MoreButton value="유튜브 보러가기" onClick={onClickButton}/>
    {/if}
  </Container>
{/await}