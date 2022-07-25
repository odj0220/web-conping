<script lang=ts>
  import { graphqlApi } from '../lib/_api';

  import { gotoShorts } from '$lib/utils/goto';

  import Spinner from '$component/common/shared/Spinner.svelte';
  import ShortsGridVodList from '$component/ShortsGridVodList.svelte';
  import Container from '$component/common/layout/Container.svelte';
  import EmptyMessage from '$component/common/shared/EmptyMessage.svelte';
  
  import type { IContent } from 'src/global/types';

  export let id: string;
  export let category: string;

  async function loadData(): Promise<IContent[]> {
    const query = `{
      getContentsByProgramId(id:"${id}", type:SHORTS){
        id
        title
        videoId
        thumb
        program {title}
      }
    }`;

    try {
      const result = await graphqlApi(query);
      const contents = result.data.getContentsByProgramId;
      return contents;
    } catch (error) {
      console.log(error);
      throw Error;
    }
  }
</script>

{#await loadData()}
  <Spinner />
{:then contents}
  {#if contents.length}
    <Container margin="0">
      <ShortsGridVodList
              {contents}
              onClick={gotoShorts}
      />
    </Container>
    {:else}
    <EmptyMessage text={`${category} 쇼츠`} />
  {/if}
{:catch error}
  <p class="error-message">
    {category} 쇼츠 데이터를 <br/>
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
