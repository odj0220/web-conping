<script lang="ts">
  import { onMount } from 'svelte';

  import { graphqlApi } from '$lib/_api';

  import { gotoCelebs } from '$lib/utils/goto';

  import Celebs from '$component/Celebs.svelte';
  import Container from '$component/common/layout/Container.svelte';
  import MainHeaderContainer from '$container/MainHeaderContainer.svelte';

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
    console.log('contents', contents);
    console.log('cursor', cursor);
    console.log('end', end);
  };

  async function runInfiniteScrolling(event) {
    const detail = event.detail;
    await getData(8, cursor);
    detail.stop();
  }

  onMount(async () => {
    await getData(8);
  });

</script>

<!-- {#await getData()}
{:then data} -->
<MainHeaderContainer title="셀럽존" />

<Container margin="8px 0 1.6rem 0 ">
  <Celebs data={contents} onClick={gotoCelebs} {end} {cursor} infiniteScroll={true} on:request-more={runInfiniteScrolling}/>
</Container>
<!-- {/await} -->
