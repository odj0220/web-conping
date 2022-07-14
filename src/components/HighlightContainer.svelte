<script lang=ts>
  import { graphqlApi } from '../lib/_api_graphql';
  import PreviewVideos from './PreviewVideos.svelte';
  
  export let id;
  
  const handleClick = (id) => {
    console.log('TODO: click 이벤트', id);
  };

  async function loadHighlight() {
    const query = `{getContentsByProgramId(id:"${id}", type:HIGHLIGHT){id title programId videoId thumb createDt episode program {id title}}}`;
    const result = await graphqlApi(query);
    const contents: {data: any[]; end: boolean; cursor:string} = {
      data: [],
      end: false,
      cursor: '',
    };
    contents.data = result.data.getContentsByProgramId;
    return contents;
  }
</script>

{#await loadHighlight()}
    <p>loading...</p>
{:then data}
    {#if data.length}
        <PreviewVideos
                contents={data}
                onClick={handleClick}
        />
    {:else}
        <p>하이라이트가 없습니다.</p>
    {/if}
{/await}

<style lang="scss">

</style>
