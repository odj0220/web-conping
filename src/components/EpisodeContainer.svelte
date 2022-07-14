<script lang=ts>
  import { graphqlApi } from '../lib/_api_graphql';
  import ImageListView from './ImageListView.svelte';

  export let id;


  async function loadContents() {
    const query = `{getContentsByProgramId(id:"${id}", type:FULL){id title videoId thumb program {title}}}`;
    const result = await graphqlApi(query);
    const contents = result.data.getContentsByProgramId;
    return contents;
  }

  const handleClick = (clickedId: string) => {
    console.log('TODO: click 이벤트', clickedId);
  };
</script>

{#await loadContents()}
{:then contents}
    {#if contents.length}
        {contents.length}
        <ImageListView
                {contents}
                onClick={handleClick}
        />
    {:else}
        <p>에피소드가 없습니다.</p>
    {/if}
{/await}

