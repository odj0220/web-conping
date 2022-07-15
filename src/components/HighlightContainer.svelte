<script lang=ts>
  import { graphqlApi } from '../lib/_api_graphql';
  import PreviewVideos from './PreviewVideos.svelte';
  import type { Content } from 'src/global/types';

  export let id;

  const handleClickContents = (contentsId: string) => {
    window.location.href = `/contents/${contentsId}`;
  };

  async function loadHighlight() {
    const query = `{
      getContentsByProgramId(id:"${id}", type:HIGHLIGHT){
        id
        title
        programId
        videoId
        thumb
        createDt
        episode
        program{
          id
          title
        }
      }
    }`;
    const result = await graphqlApi(query);
    const data: {data: Content[]; end: boolean; cursor:string} = {
      contents: result.data.getContentsByProgramId,
      end: false,
      cursor: '',
    };
    return data;
  }
</script>

{#await loadHighlight()}
    <p>loading...</p>
{:then {contents, end, cursor}}
    {#if contents.length}
        <PreviewVideos
                contents={contents}
                end={end}
                cursor={cursor}
                onClick={handleClickContents}
        />
    {:else}
        <p>하이라이트가 없습니다.</p>
    {/if}
{/await}
