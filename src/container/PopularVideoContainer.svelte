<script lang="ts">
  import { graphqlApi } from '$lib/_api';

  import { gotoContents } from '$lib/utils/goto';

  import Container from '$component/common/layout/Container.svelte';
  import Title from '$component/Title.svelte';
  import PreviewVideos from '$component/PreviewVideos.svelte';
import PopularVideoSkeleton from '$component/skeleton/container/PopularVideoSkeleton.svelte';

  let end = false;
  let cursor = '';

  async function getMainContents() {
    const query = `{
      getMainContents{
        title {
          text
          type
        }
        contents {
          thumb
          title
          videoId
          episode
          id
          program {
            id
            title
            thumbnail
          }
          createDt
          episode
          views
        }
      }
    }`;

    const {
      data: {
        getMainContents: {
          title,
          contents,
        },
      },
    } = await graphqlApi(query);

    return { title, contents };
  }
</script>

{#await getMainContents()}
<PopularVideoSkeleton />
{:then { title, contents }}
  {#if contents?.length }
    <Container margin="4rem 0 0 0">
      <Title
        {title}
      />
      <PreviewVideos
        {contents}
        {end}
        {cursor}
        onClick={gotoContents}
        infiniteScroll={false}
        autoPlay={true}
      />
    </Container>
  {/if}
{/await}
