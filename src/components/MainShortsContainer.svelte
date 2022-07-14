<script lang="ts">
  import { onMount } from 'svelte';

  import { graphqlApi } from '$lib/_api_graphql';
  
  import { goto } from '$app/navigation';

  import type { Content, TitleElement } from 'src/global/types';

  import CenterSection from '$styles/CenterSection.svelte';
  import Hscroller from './HorizontalScroller.svelte';

  import Title from './Title.svelte';
  import ShortVodList from './ShortVodList.svelte';

  let contents: Content[];
  let title: TitleElement[];

  onMount(async () => {
    getShorts();
  });

  function handleClickShorts(id:string) {
    goto(`/shorts/${id}`);
  }

  async function getShorts() {
    const query = `{
      getMainShorts{
        title {
          text
          type
        } 
        contents {
          thumb
          title
          videoId
        }
      }
    }`;
  
    const result = await graphqlApi(query);

    title = result?.data?.getMainShorts?.title;
    contents = result?.data?.getMainShorts?.contents;
  }
</script>

{#if contents?.length }
  <CenterSection type="transparency">
    <Title {title}></Title>
    
    <Hscroller>
      <ShortVodList
      {contents}
      onClick={handleClickShorts}
      />
    </Hscroller>
  </CenterSection>
{/if}