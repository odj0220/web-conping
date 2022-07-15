<script lang="ts">
  import { onMount } from 'svelte';
  
  import { graphqlApi } from '../lib/_api_graphql';
  
  import { goto } from '$app/navigation';
  
  import type { Content } from 'src/global/types';
  
  import CenterSection from '../styles/CenterSection.svelte';
  import PreviewVideos from './PreviewVideos.svelte';

  let contents: Content[];
  let end = false;
  let cursor = '';

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
                   title
                   programId
                   program {
                      id
                      title
                      thumbnail
                   }
                   createDt
                   episode
                   videoId
                   thumb
                   views
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
  
      contents = getMainInfiniteContents.edges.map((edge) => edge.node);
      end = !getMainInfiniteContents.pageInfo.hasNextPage;
      cursor = getMainInfiniteContents.pageInfo.startCursor;
    } catch (error) {
      console.log(error);
    }
  }

  function handleClickContents(id: string) {
    goto(`/contents/${id}`);
  }

  async function runInfiniteScrolling(event) {
    const detail = event.detail;
    await loadContents(6, cursor);
    detail.stop();
  }
</script>

<CenterSection type="transparency">
  <PreviewVideos
    {contents}
    {end}
    {cursor}
    infiniteScroll={true}
    autoPlay={true}
    onClickContents={handleClickContents}
    on:request-more={runInfiniteScrolling}
  />
</CenterSection>
