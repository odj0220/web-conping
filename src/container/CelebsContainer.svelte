<script lang="ts">
  import { graphqlApi } from '$lib/_api';
  
  import Celebs from '$component/Celebs.svelte';
  import Container from '$component/common/layout/Container.svelte';
  import MainHeaderContainer from '$container/MainHeaderContainer.svelte';

  const getData = async () => {
    const query = '{celebs{id name thumbnail categories {id name fontColor backColor} countOfFollowers countOfProducts countOfContents}}';
    const { data: { celebs } } = await graphqlApi(query);
    return celebs;
  };

  const onClickCeleb = (id: string) => {
    window.location.href = `/celebs/${id}`;
  };

</script>

{#await getData()}
{:then data} 
<MainHeaderContainer title="셀럽존" />

<Container margin="8px 0 0 0">
  <Celebs {data} onClick={onClickCeleb}/>
</Container>
{/await}
