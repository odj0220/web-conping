<script lang="ts">
  import { onMount } from 'svelte';
  
  import { graphqlApi } from '../lib/_api_graphql';
  
  import { goto } from '$app/navigation';
  
  import CenterSection from '../styles/CenterSection.svelte';
  import PreviewVideos from './PreviewVideos.svelte';

  let contents: {data: any[]; end: boolean; cursor:string} = {
    data: [],
    end: false,
    cursor: '',
  };

  onMount(async () => {
    await loadContents(2);
  });

  async function loadContents(num: number, cursor?: string): Promise<any> {
    const query = `{
        getMainInfiniteContents(
            first: ${num},
            ${cursor ? `afterCursor: "${cursor}"` : ''}
        ) {
            totalCount,
            edges {
                cursor
                node {
                   id
                   name
                   programId
                   program {
                      id
                      name
                   }
                   createDt
                   round
                   videoId
                   thumb
                }
            }
            pageInfo {
                hasNextPage
                startCursor
            }
        }
    }`;

    try {
      const { data: { getMainInfiniteContents } } = await graphqlApi(query);
  
      const newContents = getMainInfiniteContents.edges.map((edge) => edge.node);
  
      const videos = [...contents.data, ...newContents];
  
      contents.data = videos;
      contents.end = !getMainInfiniteContents.pageInfo.hasNextPage;
      contents.cursor = getMainInfiniteContents.pageInfo.startCursor;
    } catch (error) {
      console.log(error);
    }
  }

  function handleClickContents(id: string) {
    goto(`/contents/${id}`);
  }

  async function runInfiniteScrolling(event) {
    const detail = event.detail;
    await loadContents(6, contents.cursor);
    detail.stop();
  }
</script>

<CenterSection type="transparency">
  <PreviewVideos
    {contents}
    infiniteScroll={true}
    autoPlay={true}
    onClickContents={handleClickContents}
    on:request-more={runInfiniteScrolling}
  />
</CenterSection>
