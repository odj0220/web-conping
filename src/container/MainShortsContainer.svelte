<script lang="ts">
  import { graphqlApi } from '$lib/_api';
  
  import { goto } from '$app/navigation';

  import Title from '$component/Title.svelte';
  import ShortsVodList from '$component/ShortsVodList.svelte';
  import Container from '$component/common/layout/Container.svelte';

  function handleClickShorts(id:string) {
    goto(`/shorts/${id}`);
  }

  async function getData() {
    const query = `{
        getMainShorts{
          title {
            text
            type
          } 
          contents {
            id
            thumb
            title
          }
        }
      }`;

    const { data: { getMainShorts: { title, contents } } } = await graphqlApi(query);

    return {
      title, contents,
    };
  }
</script>

{#await getData()} 
{:then {title, contents}} 
  {#if contents?.length }
    <Container type="full" margin="5.6rem 0 0 0">
      <Title {title} marginLeft="1.6rem" marginBottom="1.6rem"/>
      
      <ShortsVodList
        {contents}
        onClick={handleClickShorts}
      />
    </Container>
  {/if}
{/await}
