<script lang="ts">
  import { onMount } from 'svelte';
  
  import { graphqlApi } from '../lib/_api';
  
  import { goto } from '$app/navigation';

  import type { IContent } from 'src/global/types';
  
  import PreviewVideos from '$component/PreviewVideos.svelte';
  import Container from '$component/common/layout/Container.svelte';

  let contents: IContent[] = [];
  let end = false;
  let cursor = '';

  onMount(async () => {
    await loadContents(2);
  });

  async function loadContents(num: number, inputedCursor?: string): Promise<any> {
    const query = `{
          getMainInfiniteContents(
              first: ${num},
              ${inputedCursor ? `afterCursor: "${inputedCursor}"` : ''}
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
      const newContents = getMainInfiniteContents.edges.map((edge) => edge.node);

      contents = [...contents, ...newContents];
      end = !getMainInfiniteContents.pageInfo.hasNextPage;
      cursor = getMainInfiniteContents.pageInfo.startCursor;
    } catch (error) {
      console.log(error);
    }
  }

  const handleClickContents = (id: string) => {
    goto(`/contents/${id}`, {
      replaceState: false,
    });
  };

  async function runInfiniteScrolling(event) {
    const detail = event.detail;
    await loadContents(6, cursor);
    detail.stop();
  }
</script>

<Container margin="5.6rem 0 0 0">
  <PreviewVideos
    {contents}
    {end}
    {cursor}
    infiniteScroll={true}
    autoPlay={true}
    onClick={handleClickContents}
    on:request-more={runInfiniteScrolling}
  />
</Container>
