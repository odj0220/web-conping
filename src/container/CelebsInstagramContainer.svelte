<script lang="ts">
  import { graphqlApi } from '$lib/_api';

  import { openBrowser } from '$lib/util';
  
  import Container from '$component/common/layout/Container.svelte';
  import MoreButton from '$component/common/shared/MoreButton.svelte';
  import ImageGridList from '$component/ImageGridList.svelte';
  import Title from '$component/Title.svelte';
  
  import type { TitleElement } from 'src/global/types';

  export let id: string;
  export let moreButton: boolean;
  export let title : TitleElement[] = [];
  export let category : string;

  const getData = async () => {
    const query = `{
      getSocialsByCelebId (id: "${id}", type: instagram) {
        id
        type
        board_thumbnails
        link
      }
    }`;
  
    const { data: { getSocialsByCelebId } } = await graphqlApi(query);

    return getSocialsByCelebId;
  };

</script>

{#await getData()}
  
{:then data}
{#if data.length}
<Container margin="0 0 5.6rem">
  <Title title={title} />
  {#if data.board_thumbnails.length > 6}
    <ImageGridList data={[...data.board_thumbnails].slice(0, 6)}/>
  {:else}
  <ImageGridList data={data.board_thumbnails}/>
  {/if}
  
  {#if moreButton}
    <MoreButton value="인스타그램 보러가기" onClick={() => openBrowser(data.link)}/>
  {/if}
</Container>
{/if}
{/await}
