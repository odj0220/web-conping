<script lang=ts>
  import GridViewList from './GridViewList.svelte';
  import { onMount } from 'svelte';
  import { graphqlApi } from '../lib/_api_graphql';

  export let id; //TODO: data get
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

<GridViewList
  {contents}
  onClick={handleClick}
/>
