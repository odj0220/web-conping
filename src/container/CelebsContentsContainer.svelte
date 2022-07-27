<script type="ts">
  import { graphqlApi } from '$lib/_api';

  import { gotoContents } from '$lib/utils/goto';

  import Container from '$component/common/layout/Container.svelte';
  import EmptyMessage from '$component/common/shared/EmptyMessage.svelte';
  import Title from '$component/Title.svelte';
  import MoreButton from '$component/common/shared/MoreButton.svelte';
  import PreviewVideos from '$component/PreviewVideos.svelte';
  import ImageListView from '$component/ImageListView.svelte';

  import type { IContent, TitleElement } from 'src/global/types';
  import type { ITabItem } from 'src/global/types';
  import { onMount } from 'svelte';

  export let id : string;
  export let title : TitleElement[] = [];
  export let moreButton: boolean;
  export let category: string;

  let contents: IContent[] = [];
  let end = false;
  let cursor = '';

  $: num = title.length ? 2 : 3;
  $: infiniteScroll = !title.length;

  function initialContentsLoad() {
    return loadContents();
  }

  async function runInfiniteScrolling(event) {
    const detail = event.detail;
    await loadContents();
    detail.stop();
  }

  async function loadContents(): Promise<any> {
    const query = `{
          getContentsByCelebId(
              id: 1
              limit: ${num},
              ${cursor ? `cursor: ${cursor}` : ''}
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
      const { data: { getContentsByCelebId } }: any = await graphqlApi(query);
      const newContents = getContentsByCelebId.edges.map((edge) => edge.node);

      contents = [...contents, ...newContents];
      cursor = getContentsByCelebId.pageInfo.startCursor;
      end = !getContentsByCelebId.pageInfo.hasNextPage;
    } catch (error) {
      console.log(error);
    }
  }

</script>

{#await initialContentsLoad()}
{:then}
  {#if contents.length}
    <Container margin="5.6rem 0 0">
      {#if title.length}
        <Title title={title} />
      {/if}
      <PreviewVideos
              contents={contents}
              {end}
              {cursor}
              onClick={gotoContents}
              infiniteScroll={infiniteScroll}
              autoPlay={false}
              on:request-more={runInfiniteScrolling}
      />
    </Container>
  {:else}
    {#if title.length}
    {:else}
    <EmptyMessage text={`${category}님의 콘텐츠는 준비중입니다. 조금만 기다려주세요 :)`} />
    {/if}
  {/if}
{/await}
