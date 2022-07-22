<script type="ts">
  import { graphqlApi } from '$lib/_api';

  import { gotoContents } from '$lib/utils/goto';

  import Container from '$component/common/layout/Container.svelte';
  import EmptyMessage from '$component/common/shared/EmptyMessage.svelte';
  import Title from '$component/Title.svelte';
  import MoreButton from '$component/common/shared/MoreButton.svelte';
  import PreviewVideos from '$component/PreviewVideos.svelte';
  import ImageListView from '$component/ImageListView.svelte';
    
  import type { TitleElement } from 'src/global/types';

  export let id : string;
  export let title : TitleElement[] = [];
  export let moreButton: boolean;

  const getData = async () => {
    const query = `{
      getContentsByCelebId(id:"celeb17"){
        id
        title
        subtitle
        programId
        createDt
        episode
        description
        url
        videoId
        thumb
        program {
          title
        }
      }
    }`;

    const result = await graphqlApi(query);
    console.log("result", result)
    const { data: {getContentsByCelebId} } = await graphqlApi(query);
    return getContentsByCelebId;
  };

  const promise = getData();

</script>

{#await promise}
{:then contents}

{#if contents.length}

<Container margin="5.6rem 0 0">
  {#if title}
    <Title title={title}/>
    <ImageListView {contents} onClick={gotoContents}/>
    {#if moreButton && contents.length > 4}
      <MoreButton value="서울리안 콘텐츠 더보기" margin="1.6rem 0 0"/>
    {/if}
  {:else} 
    <PreviewVideos {contents} />
  {/if}
  </Container>

{:else}
  <EmptyMessage text="서울리안 님의 콘텐츠" />
{/if}

{/await}
