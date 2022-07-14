<script lang=ts>
  import ShortsGridVodList from './ShortsGridVodList.svelte';
  import { graphqlApi } from '../lib/_api_graphql';

  export let id;
  
  const handleClick = (id) => {
    console.log('TODO: click 이벤트', id);
  };

  async function loadData() {
    const query = `{getContentsByProgramId(id:"${id}", type:SHORTS){id title videoId thumb program {title}}}`;
    const result = await graphqlApi(query);
    const contents = result.data.getContentsByProgramId;
    return contents;
  }
</script>

{#await loadData()}
{:then contents}
  {#if contents.length}
    <ShortsGridVodList
            {contents}
            onClick={handleClick}
    />
    {:else}
    <p>쇼츠가 없습니다.</p>
  {/if}

{/await}
