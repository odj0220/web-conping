<script type="ts">
  import { graphqlApi } from '$lib/_api';

  import { gotoShorts } from '$lib/utils/goto';
  
  import Container from '$component/common/layout/Container.svelte';
  import ShortsGridVodList from '$component/ShortsGridVodList.svelte';
  import EmptyMessage from '$component/common/shared/EmptyMessage.svelte';
  import Title from '$component/Title.svelte';
  import ShortsVodList from '$component/ShortsVodList.svelte';
  import MoreButton from '$component/common/shared/MoreButton.svelte';

  import type { TitleElement } from 'src/global/types';
  import type { IContent } from 'src/global/types';

  export let id : string;
  export let title : TitleElement[] = [];
  export let moreButton: boolean;
  export let category: string;
  export let onClickMoreButton: (index: number) => void;

  let contents: IContent[] = [];
  let end = false;
  let cursor = '';

  $: num = title.length ? 4 : 6;
  $: infiniteScroll = !title.length;

  const initialContentsLoad = () => {
    return loadShorts();
  };

  const runInfiniteScrolling = async (event) => {
    const detail = event.detail;
    await loadShorts();
    detail.stop();
  };

  const loadShorts = async () => {
    const query = `{
          getShortsByCelebId (
              id: 1,
              shorts: true,
              limit: ${num},
              ${cursor ? `cursor: ${cursor}` : ''}
          ) {
            totalCount,
            contents {
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
            pageInfo {
                hasNextPage
                startCursor
            }
          }
        }`;

    const { data: { getShortsByCelebId } }: any = await graphqlApi(query);
    const newContents = getShortsByCelebId.contents;

    contents = [...contents, ...newContents];
    cursor = getShortsByCelebId.pageInfo.startCursor;
    end = !getShortsByCelebId.pageInfo.hasNextPage;
  };
</script>

{#await initialContentsLoad()}
{:then}
  {#if contents.length}
    {#if title.length}
      <Container type="full" margin="5.6rem 0 0">
        <Title title={title} marginLeft="1.2rem" />
        <ShortsVodList {contents} onClick={gotoShorts} />

        {#if moreButton && contents.length >= 4}
          <MoreButton value={`${category} 쇼츠 더보기`} margin="1.6rem 1.6rem 0" onClick={() => onClickMoreButton(3)}/>
        {/if}
      </Container>
    {:else}
      <Container margin="5.6rem 0 0">
        <ShortsGridVodList
                {contents}
                {end}
                {cursor}
                onClick={gotoShorts}
                infiniteScroll={infiniteScroll}
                on:request-more={runInfiniteScrolling}/>
      </Container>
    {/if}
  {:else}
    {#if !title.length}
        <Container type="full" margin="5.6rem 0 0">
            <EmptyMessage text={`${category}님의 쇼츠`} />
        </Container>
    {/if}
  {/if}
{/await}
