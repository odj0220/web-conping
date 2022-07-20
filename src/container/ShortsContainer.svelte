<script lang=ts>
  import { graphqlApi } from '../lib/_api';

  import { goto } from '$app/navigation';

  import type { IContent } from 'src/global/types';

  import Spinner from '$component/common/shared/Spinner.svelte';
  import ShortsGridVodList from '$component/ShortsGridVodList.svelte';

  export let id: string;
  export let programTitle: string;

  const handleClickShorts = (id: string) => {
    goto(`/shorts/${id}`);
  };

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
    <ShortsGridVodList
            {contents}
            onClick={handleClickShorts}
    />
    {:else}
    <p class="empty-message">
      {programTitle} 쇼츠는 준비중입니다. <br/>
      조금만 기다려주세요 :)
    </p>
  {/if}
{:catch error}
  <p class="error-message">
    {programTitle} 쇼츠 데이터를 <br/>
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
