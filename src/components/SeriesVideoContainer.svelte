<script lang="ts">
  import { onMount } from 'svelte';

  import { goto } from '$app/navigation';
  
  import { graphqlApi } from '$lib/_api_graphql';

  import type { Content, Program, TitleElement } from 'src/global/types';
  
  import CenterSection from '../styles/CenterSection.svelte';
  
  import Title from './Title.svelte';
  import ImageListView from './ImageListView.svelte';
  import MoreButton from './common/shared/MoreButton.svelte';
import Container from './common/layout/Container.svelte';

  let title: TitleElement[];
  let contents: Content[];
  let series: Program;
  
  const move = (targetUrl: string) => {
    goto(targetUrl);
  };

  const handleTitleClick = () => {
    move(`/programs/${series.id}`);
  };

  const handleItemClick = (id: string) => {
    move(`/contents/${id}`);
  };

  const handleButtonClick = () => {
    move(`/programs/${series.id}`);
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

    const response = await graphqlApi(query);

    const {
      title: resivedTitle,
      series: resivedSeries,
      contents: resivedContents,
    } = response.data.getMainSeries;

    title = resivedTitle;
    series = resivedSeries;
    contents = resivedContents;
  };

  onMount(async () => {
    getData();
  });
</script>

{#if contents?.length }
  <Container type="grayBox" margin="5.6rem 1.6rem 0">
    <Title
      onClick={handleTitleClick}
      {title}
      marginBottom="1.6rem"
    />
    
    <ImageListView
      {contents}
      onClick={handleItemClick}
    />
    
    <MoreButton
      value="{series.title} 시리즈 보러가기"
      onClick={handleButtonClick}
    />
  </Container>
{/if}
