<script lang="ts">
  import { onMount } from 'svelte';
  import { graphqlApi } from '$lib/_api';

  import type { IContent } from 'src/global/types';

  import BottomSheet from './common/layout/BottomSheet.svelte';
  import RelatedProductContainer from './RelatedProductContainer.svelte';
  import ShortsDetailInfo from './ShortsDetailInfo.svelte';
  import ShortsFullScreen from './ShortsFullScreen.svelte';

  export let id: string;

  let content: IContent;
  let offsetTop = 0;

  const setOffsetTop = (num: number) => {
    offsetTop = num;
  };

  const onClickClose = (e: TouchEvent) => {
    e.stopPropagation();
    history.go(-1);
  };

  const onClickShare = (e: TouchEvent) => {
    e.stopPropagation();
  };

  const onClickCart = (e: TouchEvent) => {
    e.stopPropagation();
    setOffsetTop(176);
  };

  const onClickProfile = (e: TouchEvent) => {
    e.stopPropagation();
  };

  const getContent = async () => {
    const query = `{
      content(id:"${id}"){
        id 
        title
        contentType 
        createDt 
        description
        program { 
          id
          title
        }
        programId 
        episode 
        thumb 
        videoId 
        duration 
        currentTime
      }
    }`;

    const result = await graphqlApi(query);

    content = result?.data?.content;
  };

  onMount(async () => {
    await getContent();
  });

</script>

{#if content }
  <ShortsFullScreen
    videoId={content.videoId}
    thumbnail={content.thumb}
  >
    <ShortsDetailInfo
      onClickClose={onClickClose}
      onClickShare={onClickShare}
      onClickCart={onClickCart}
      onClickProfile={onClickProfile}
      {content}
    />
  </ShortsFullScreen>
{/if}

<BottomSheet
  height={560}
  offsetTop={offsetTop}
  setOffsetTop={setOffsetTop}
>
  <RelatedProductContainer
    {id}
    moreButton={false}
  />
</BottomSheet>
