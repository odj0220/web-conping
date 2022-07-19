<script type="ts">
import Container from './common/layout/Container.svelte';
import CelebsVisual from './CelebsVisual.svelte';
import { graphqlApi } from '$lib/_api';

export let id: string;

const getData = async () => {
  const query = `
    {
      celeb(id:"${id}"){
        name
        description
        categories
        thumbnail
      }
    }
  `;
  const { data: { celeb } } = await graphqlApi(query);
};

</script>

{#await getData()}
{:then data} 
<Container margin="0" type="full">
  <CelebsVisual {data}/>
</Container>  
{/await}
