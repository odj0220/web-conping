<script lang="ts">
  import CenterSection from '../styles/CenterSection.svelte';
  import PreviewVideos from './PreviewVideos.svelte';
  import { onMount, tick } from 'svelte';
  import { graphqlApi } from '../lib/_api_graphql';

  let contents: {data: any[]; end: boolean; cursor:string} = {
    data: [],
    end: false,
    cursor: '',
  };

  let autoPlay = true;
  let promise: any = null;

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

  function handleClick() {
    console.log('click');
  }

  async function runInfiniteScrolling(event) {
    const detail = event.detail;
    await loadContents(6, contents.cursor);
    detail.stop();
  }
</script>

<CenterSection>
    <PreviewVideos
            contents={contents}
            infiniteScroll={true}
            autoPlay={true}
            onClick={handleClick}
            on:request-more={runInfiniteScrolling}
    />
</CenterSection>

<style lang="scss">

</style>
