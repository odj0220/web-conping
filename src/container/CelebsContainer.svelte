<script lang="ts">
  import { graphqlApi } from '$lib/_api';

  import { gotoCelebs } from '$lib/utils/goto';

  import Celebs from '$component/Celebs.svelte';
  import Container from '$component/common/layout/Container.svelte';
  import MainHeaderContainer from '$container/MainHeaderContainer.svelte';
  import CelebsSkeleton from '$component/skeleton/container/CelebsSkeleton.svelte';

  import type { ICeleb } from 'src/global/types';

  let contents: ICeleb[] = [];
  let end = false;
  let cursor = '';

  const getData = async (num: number, inputedCursor?: string) => {
    const query = `{
      getInfiniteCelebs(
              first: ${num},
              ${inputedCursor ? `afterCursor: "${inputedCursor}"` : ''}
          ) {
              totalCount,
              edges {
                  cursor
                  node {
                    id name thumbnail categories {id name fontColor backColor} countOfFollowers countOfProducts countOfContents
                  }
              }
              pageInfo {
                  hasNextPage
                  startCursor
              }
          }
      }`;
    const { data: { getInfiniteCelebs } } = await graphqlApi(query);
    const newContents = getInfiniteCelebs.edges.map((edge) => edge.node);

    contents = [...contents, ...newContents];
    end = !getInfiniteCelebs.pageInfo.hasNextPage;
    cursor = getInfiniteCelebs.pageInfo.startCursor;
  };

  async function runInfiniteScrolling(event) {
    const detail = event.detail;
    await getData(8, cursor);
    detail.stop();
  }

</script>

{#await getData(8)}
<CelebsSkeleton />
{:then data}
<MainHeaderContainer title="셀럽존" />

<Container margin="8px 0 1.6rem 0 ">
  <Celebs celebs={contents} onClick={gotoCelebs} {end} {cursor} infiniteScroll={true} on:request-more={runInfiniteScrolling}/>
</Container>
{/await}
