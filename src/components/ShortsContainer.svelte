<script lang=ts>
  import ShortsGridVodList from './ShortsGridVodList.svelte';
  import { graphqlApi } from '../lib/_api_graphql';
  import { goto } from '$app/navigation';
  import type { Content } from 'src/global/types';

  export let id;

  const handleClickShorts = (id: string) => {
    goto(`/contents/${id}`);
  };

  async function loadData(): Promise<Content[]> {
    const query = `{
      getContentsByProgramId(id:"${id}", type:SHORTS){
        id
        title
        videoId
        thumb
        program {title}
      }
    }`;
    const result = await graphqlApi(query);
    const contents = result.data.getContentsByProgramId;
    return new Promise((resolve, reject) => resolve(contents));
  }
</script>

{#await loadData()}
{:then contents}
  {#if contents.length}
    <ShortsGridVodList
            {contents}
            onClick={handleClickShorts}
    />
    {:else}
    <p>쇼츠가 없습니다.</p>
  {/if}
{/await}
