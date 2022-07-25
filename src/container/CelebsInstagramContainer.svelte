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

    return getSocialsByCelebId[0];
  };

</script>

{#await getData()}
  
{:then {board_thumbnails, link}} 
  <Container margin="5.6rem 0 0">
    <Title title={title} />
    {#if board_thumbnails.length > 6}
      <ImageGridList data={[...board_thumbnails].slice(0, 6)}/>
    {:else}
    <ImageGridList data={board_thumbnails}/>
    {/if}
    
    {#if moreButton}
      <MoreButton value="인스타그램 보러가기" onClick={() => openBrowser(link)}/>
    {/if}
  </Container>
{/await}