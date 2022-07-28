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

  export let id : string;
  export let title : TitleElement[] = [];
  export let moreButton: boolean;
  export let category: string;
  export let onClickMoreButton: (index: number) => void;

  let contents: IContent[] = [];
  let end = false;
  let cursor = '';

  $: num = title.length ? 4 : 3;
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
              id: 2
              limit: ${num},
              ${cursor ? `cursor: ${cursor}` : ''}
          ) {
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
    try {
      const { data: { getContentsByCelebId } }: any = await graphqlApi(query);
      const newContents = getContentsByCelebId.contents;

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
    {#if title.length}
      <Container margin="0 0 5.6rem">
        <Title title={title} />
        <ImageListView contents={[...contents].slice(0, 4)} onClick={gotoContents}/>
        {#if moreButton}
          {#if contents.length >= 4}
              <MoreButton value={`${category} 콘텐츠 더보기`} margin="1.6rem 0 0" onClick={() => onClickMoreButton(2)}/>
            {:else}
              <section class="gap"></section>
          {/if}
        {/if}
      </Container>
    {:else}
      <Container margin="0 0 5.6rem">
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
    {/if}
  {:else}
    {#if title.length}
    {:else}
      <EmptyMessage text={`${category}님의 콘텐츠`} />
    {/if}
  {/if}
{/await}

<style lang="scss">
  .gap {
    width: 100vw;
    margin-left: -1.6rem;
    margin-right: -1.6rem;
    margin-top: 3.2rem;
  }
</style>
