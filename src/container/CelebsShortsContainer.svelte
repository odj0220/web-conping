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

  export let id : string;
  export let title : TitleElement[] = [];
  export let moreButton: boolean;
  export let category: string;

  const getData = async () => {
    const query = `{
      getContentsByCelebId (id: "${id}", type: SHORTS) {
        id
        title
        subtitle
        programId
        contentType
        createDt
        thumb
      }
    }`;

    const { data: { getContentsByCelebId } } = await graphqlApi(query);

    return getContentsByCelebId;
  };

  const promise = getData();

</script>

{#await promise}
{:then contents} 
  {#if contents.length}
    {#if title.length}
      <Container type="full" margin="5.6rem 0 0">    
        <Title title={title} marginLeft="1.2rem" />
        <ShortsVodList {contents} onClick={gotoShorts} />

        {#if moreButton && contents.length > 4}
          <MoreButton value={`${category} 쇼츠 더보기`} margin="1.6rem 1.6rem 0"/>
        {/if}

      </Container>
    {:else}
      <Container margin="5.6rem 0 0">
        <ShortsGridVodList {contents} onClick={gotoShorts} />
      </Container>
    {/if}
  {:else}
    {#if title.length}
    {:else}
    <EmptyMessage text={`${category}님의 쇼츠`} />
    {/if}
  {/if}
{/await}
