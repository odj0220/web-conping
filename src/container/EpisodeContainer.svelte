<script lang=ts>
  import { graphqlApi } from '../lib/_api';

  import type { IContent } from 'src/global/types';

  import { goto } from '$app/navigation';

  import Spinner from '$component/common/shared/Spinner.svelte';
  import ImageListView from '$component/ImageListView.svelte';
  import Container from '$component/common/layout/Container.svelte';
  import EmptyMessage from '$component/common/shared/EmptyMessage.svelte';

  export let id: string;
  export let category: string;

  async function loadContents(): Promise<IContent[]> {
    const query = `{
       getContentsByProgramId(id:"${id}", type:FULL){
         id
         title
         videoId
         thumb
         episode
         program{
           title
         }
       }
    }`;

    const result = await graphqlApi(query);

    const contents = result.data.getContentsByProgramId;
  
    return contents;
  }

  const handleClickContents = (contentsId: string) => {
    goto(`/contents/${contentsId}`);
  };
</script>

{#await loadContents()}
  <Spinner />
{:then contents}
  {#if contents.length}
    <Container margin="2.4rem 0 4rem">
      <ImageListView
        {contents}
        onClick={handleClickContents}
      />
    </Container>
  {:else}
  <EmptyMessage text={`${category} 에피소드`} />
  {/if}
{:catch error}
  <p class="error-message">
    {category} 에피소드 데이터를 <br/>
    가져오는데 실패하였습니다.
  </p>
{/await}


<style lang="scss">
  .empty-message, .error-message {
    margin: 9.6rem 0;
    width: 100%;
    text-align: center;
    @include caption1-400;
    color: $disabled-8a;
  }
</style>
