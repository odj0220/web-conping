<script lang="ts">
  import { graphqlApi } from '$lib/_api';

  import { gotoShorts } from '$lib/utils/goto';

  import Title from '$component/Title.svelte';
  import ShortsVodList from '$component/ShortsVodList.svelte';
  import Container from '$component/common/layout/Container.svelte';
import ShortsGridListSkeleton from '$component/skeleton/ShortsGridListSkeleton.svelte';

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
<ShortsGridListSkeleton />
{:then {title, contents}}
  {#if contents?.length }
    <Container type="full" margin="5.6rem 0 0 0">
      <Title {title} marginLeft="1.6rem" marginBottom="1.6rem"/>

      <ShortsVodList
        {contents}
        onClick={gotoShorts}
      />
    </Container>
  {/if}
{/await}
