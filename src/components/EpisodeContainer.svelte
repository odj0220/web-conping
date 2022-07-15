<script lang=ts>
  import { graphqlApi } from '../lib/_api_graphql';
  import ImageListView from './ImageListView.svelte';
  import type { Content } from 'src/global/types';

  export let id;

  async function loadContents(): Promise<Content[]> {
    const query = `{
       getContentsByProgramId(id:"${id}", type:FULL){
         id
         title
         videoId
         thumb
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
    window.location.href = `/contents/${contentsId}`;
  };
</script>

{#await loadContents()}
{:then contents}
    {#if contents.length}
        <ImageListView
                {contents}
                onClick={handleClickContents}
        />
    {:else}
        <p>에피소드가 없습니다.</p>
    {/if}
{/await}

