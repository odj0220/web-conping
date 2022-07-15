<script lang="ts">
  import type { IContent, TitleElement } from 'src/global/types';
  
  import CenterSection from '$styles/CenterSection.svelte';
  import PreviewVideos from './PreviewVideos.svelte';

  import Title from './Title.svelte';

  import { onMount } from 'svelte';
  import { graphqlApi } from '$lib/_api_graphql';
import Container from './common/layout/Container.svelte';

  let contents: IContent[];
  let end = false;
  let cursor = '';
  let title: TitleElement[];

  const handleClickContents = (id: string) => {
    window.location.href = `/contents/${id}`;
  };

  onMount(async () => {
    getMainContents();
  });

  async function getMainContents() {
    const query = `{
      getMainContents{
        title {
          text
          type
        } 
        contents {
          thumb
          title
          videoId
          episode
          id
          program {
            title
            thumbnail
          }
          createDt
          episode
          views
        }
      }
    }`;
  
    const result = await graphqlApi(query);

    title = result?.data?.getMainContents?.title;
    contents = result?.data?.getMainContents?.contents;
  }
</script>

{#if contents?.length }
  <Container marginTop="4rem">
    <Title
      {title}
    />
    <PreviewVideos
      {contents}
      {end}
      {cursor}
      onClickContents={handleClickContents}
      infiniteScroll={false}
      autoPlay={true}
    />
  </Container>
{/if}
