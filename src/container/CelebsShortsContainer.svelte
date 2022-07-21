<script type="ts">
  import { graphqlApi } from '$lib/_api';

  import { gotoShorts } from '$lib/utils/goto';

  import Container from '$component/common/layout/Container.svelte';
  import ShortsGridVodList from '$component/ShortsGridVodList.svelte';

  export let id : string;
  console.log('id', id);

  const getData = async () => {
    const query = `{
      getContentsByCelebId(id:${id}){
        id
        title
      }
    }`;

    const { data } = await graphqlApi(query);

    console.log('data', await graphqlApi(query));
  
    return data;
  };

  const promise = getData();

</script>
  {#await promise}
  {:then data} 
  <Container>
    <ShortsGridVodList onClick={gotoShorts}/>
  </Container>
  {/await}
