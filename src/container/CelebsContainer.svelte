<script lang="ts">
  import { graphqlApi } from '$lib/_api';
  
  import type { ICeleb } from 'src/global/types';
  
  import Celebs from '$component/Celebs.svelte';
  import Container from '$component/common/layout/Container.svelte';
  import MainHeaderContainer from '$container/MainHeaderContainer.svelte';


  let celebs: ICeleb[] = [];

  const getData = async () => {
    const query = '{celebs{id name thumbnail categories}}';
    const result = await graphqlApi(query);
    celebs = result?.data?.celebs;
  };

  const onClickCeleb = (id: string) => {
    window.location.href = `/celebs/${id}`;
  };

</script>

{#await getData()}
{:then data} 
<MainHeaderContainer title="셀럽존" />

<Container margin="8px 0 0 0">
  <Celebs {celebs} onClick={onClickCeleb}/>
</Container>
{/await}
