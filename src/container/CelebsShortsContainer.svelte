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

  const getData = async () => {
    const query = `{
      getContentsByCelebId(id:"${id}"){
        id
        title
      }
    }`;

    const { data: getContentsByCelebId } = await graphqlApi(query);

    return getContentsByCelebId;
  };

  const promise = getData();

</script>
  {#await promise}
  {:then data} 
  {#if data.length}
    <Container>    
      {#if title}
        <Title title={title}/>
        <ShortsVodList />
        {#if moreButton}
          <MoreButton value="서울리안 쇼츠 더보기" />
        {/if}
      {/if}
      <ShortsGridVodList onClick={gotoShorts} />
    </Container>
    {:else}
      <EmptyMessage text="서울리안 님의 쇼츠" />
    {/if}
  {/await}
