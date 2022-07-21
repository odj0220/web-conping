<script lang="ts">
  import { graphqlApi } from '../lib/_api';

  import Container from '$component/common/layout/Container.svelte';
  import Title from '$component/Title.svelte';
  import ImageListView from '$component/ImageListView.svelte';
  import MoreButton from '$component/common/shared/MoreButton.svelte';
  import { gotoContents, gotoPrograms } from '$lib/utils/goto';

  const getData = async () => {
    const query = `{
      getMainSeries {
        title{
          text
          type
        }
        contents {
          id
          title
          subtitle
          programId
          createDt
          episode
          description
          url
          videoId
          thumb
          program {
            id
            title
            description
          }
          currentTime
          duration
        }
        series {
          title
          id
        }
      }
    }`;

    const {
      data: {
        getMainSeries: {
          title,
          series,
          contents,
        },
      },
    } = await graphqlApi(query);

    return { title, series, contents };
  };
</script>

{#await getData()}
{:then {title, series, contents}} 
  {#if contents?.length}
    <Container type="grayBox" margin="5.6rem 1.6rem 0">
      <Title
        onClick={() => gotoPrograms(series.id)}
        {title}
        marginBottom="1.6rem"
      />
      
      <ImageListView
        {contents}
        onClick={gotoContents}
      />
      
      <MoreButton
        value="{series.title} 시리즈 보러가기"
        onClick={() => gotoPrograms(series.id)}
      />
    </Container>
  {/if}
{/await}
