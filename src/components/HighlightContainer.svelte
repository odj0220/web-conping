<script lang=ts>
  import Videos from './Videos.svelte';
  import { onMount } from 'svelte';
  import { graphqlApi } from '../lib/_api_graphql';
  
  export let id;
  let contents = [];
  
  const handleClick = (id) => {
    console.log('TODO: click 이벤트', id);
  };

  onMount(async () => {
    const query = `{getContentsByProgramId(id:"${id}", type:HIGHLIGHT){id name videoId thumb program {name}}}`;
    const result = await graphqlApi(query);
    contents = result.data.getContentsByProgramId;
  });
</script>
  
  <Videos
    {contents}
    onClick={handleClick}
  />
  
  
  <style>
  
  </style>
