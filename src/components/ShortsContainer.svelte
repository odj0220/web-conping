<script lang=ts>
  import ShortsGridVodList from './ShortsGridVodList.svelte';
  import { graphqlApi } from '../lib/_api_graphql';
  import { onMount } from 'svelte';
  
  export let id;
  let contents = [];
  
  const handleClick = (id) => {
    console.log('TODO: click 이벤트', id);
  };
  onMount(async () => {
    const query = `{getContentsByProgramId(id:"${id}", type:SHORTS){id name videoId thumb program {name}}}`;
    const result = await graphqlApi(query);
    contents = result.data.getContentsByProgramId;
  });
</script>
  
  <ShortsGridVodList
    {contents}
    onClick={handleClick}
  />
