<script lang=ts>
  import { graphqlApi } from '../lib/_api_graphql';
  import PreviewVideos from './PreviewVideos.svelte';
  
  export let id;
  let contents: {data: any[]; end: boolean; cursor:string} = {
    data: [],
    end: false,
    cursor: '',
  };
  
  const handleClick = (id) => {
    console.log('TODO: click 이벤트', id);
  };

  async function loadHighlight() {
    const query = `{getContentsByProgramId(id:"${id}", type:HIGHLIGHT){id name programId videoId thumb createDt round program {id name}}}`;
    const result = await graphqlApi(query);
    contents.data = result.data.getContentsByProgramId;
    return contents;
  }
</script>

{#await loadHighlight()}
    <p>loading...</p>
{:then data}
    <PreviewVideos
            contents={data}
            onClick={handleClick}
    />
{/await}

<style lang="scss">

</style>
