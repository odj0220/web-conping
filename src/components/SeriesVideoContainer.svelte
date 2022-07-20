<script lang="ts">
import { goto } from '$app/navigation';
import { graphqlApi } from '../lib/_api';
import Title from './Title.svelte';
import ImageListView from './ImageListView.svelte';
import MoreButton from './common/shared/MoreButton.svelte';
import Container from './common/layout/Container.svelte';

const gotoPrograms = (id: string) => {
  goto(`/programs/${id}`);
};

const gotoContents = (id: string) => {
  goto(`/contents/${id}`);
};


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

  const { data: { getMainSeries: { title,
    series,
    contents } } } = await graphqlApi(query);

  console.log(await graphqlApi(query));
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
