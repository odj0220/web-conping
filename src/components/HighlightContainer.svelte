<script lang=ts>
  import { goto } from '$app/navigation';
  
  import { graphqlApi } from '../lib/_api_graphql';
  
  import type { Content } from 'src/global/types';

  import PreviewVideos from './PreviewVideos.svelte';

  export let id: string;

  let contents: {data: Content[]; end: boolean; cursor:string} = {
    data: [],
    end: false,
    cursor: '',
  };

  const handleClickContents = (contentsId: string) => {
    goto(`/contents/${contentsId}`);
  };

  async function loadHighlight() {
    const query = `{
      getContentsByProgramId(id:"${id}", type:HIGHLIGHT){
        id
        name
        programId
        videoId
        thumb
        createDt
        round
        program{
          id
          name
        }
      }
    }`;

    const result = await graphqlApi(query);

    const data = result.data.getContentsByProgramId;

    return {
      ...contents,
      data,
    };
  }
</script>

{#await loadHighlight()}
  <p>loading...</p>
{:then contents}
  <PreviewVideos
    {contents}
    onClickContents={handleClickContents}
  />
{/await}
