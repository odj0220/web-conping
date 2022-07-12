<script lang=ts>
  import { onMount } from 'svelte';
  
  import { graphqlApi } from '../lib/_api_graphql';
  
  import ImageListView from './ImageListView.svelte';

  export let id;

  let contents = [];

  onMount(async () => {
    const query = `{getContentsByProgramId(id:"${id}", type:EPISODE){id name videoId thumb program {name}}}`;
    const result = await graphqlApi(query);
    contents = result.data.getContentsByProgramId;
  });

  const handleClick = (clickedId: string) => {
    console.log('TODO: click 이벤트', clickedId);
  };
</script>

<ImageListView
  {contents}
  onClick={handleClick}
/>
