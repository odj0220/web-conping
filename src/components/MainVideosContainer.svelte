<script lang="ts">
  import CenterSection from '../styles/CenterSection.svelte';
  import PreviewVideos, { stopScrolling } from './PreviewVideos.svelte';
  import { onMount, tick } from 'svelte';
  import { graphqlApi } from '../lib/_api_graphql';

  let contents: any = {
    loading: true,
    data: [],
    end: false,
  };

  let autoPlay = true;
  let promise: any = null;
  let videos = [];

  onMount(async () => {
    await initialGetContents(3);
  });

  $: loading = contents.loading;

  async function initialGetContents(num: number): Promise<any> {
    const query = `{
        getMainInfiniteContents(first: ${num}) {
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
      videos = [...videos, ...newContents];
    } catch (error) {
      console.log('에러 발생');
      console.log(error);
    }
  }

  function handleClick() {
    console.log('click');
  }

  async function runInfiniteScrolling(event) {
    console.log('끝!');
    stopScrolling();
  }
</script>

<CenterSection>
    <PreviewVideos
            contents={videos}
            infiniteScroll={true}
            autoPlay={true}
            onClick={handleClick}
            on:request-more={runInfiniteScrolling}
    />
</CenterSection>

<style lang="scss">

</style>
