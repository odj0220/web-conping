<script lang="ts">
  import { goto } from '$app/navigation';
  
  import type { Content, TitleElement } from 'src/global/types';
  
  import CenterSection from '$styles/CenterSection.svelte';
  import PreviewVideos from './PreviewVideos.svelte';

  import Title from './Title.svelte';

  import { onMount } from 'svelte';
  import { graphqlApi } from '$lib/_api_graphql';

  let contents: Content[];
  let end = false;
  let cursor = '';
  let title: TitleElement[];

  const handleClickContents = (id: string) => {
    goto(`contents/${id}`);
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
          id
          program {
            title
          }
        }
      }
    }`;
  
    const result = await graphqlApi(query);

    title = result?.data?.getMainContents?.title;
    contents = result?.data?.getMainContents?.contents;
  }
</script>

{#if contents?.length }
  <CenterSection type="transparency">
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
  </CenterSection>
{/if}