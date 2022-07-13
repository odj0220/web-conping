<script lang="ts">
  import { onMount } from 'svelte';

  import { goto } from '$app/navigation';
  
  import { graphqlApi } from '$lib/_api_graphql';

  import type { Content, TitleElement } from 'src/global/types';
  
  import CenterSection from '../styles/CenterSection.svelte';
  
  import Title from './Title.svelte';
  import ImageListView from './ImageListView.svelte';
  import MoreButton from './common/shared/MoreButton.svelte';

  let contents: Content[];
  let title: TitleElement[];
  let seriesId: string;
  let seriesName: string;
  
  const move = (targetUrl: string) => {
    goto(targetUrl);
  };

  const handleTitleClick = () => {
    move(`/programs/${seriesId}`);
  };

  const handleItemClick = (id: string) => {
    move(`/contents/${id}`);
  };

  const handleButtonClick = () => {
    move(`/programs/${seriesId}`);
  };
  
  onMount(async () => {
    const query = `{
      getMainSeries{
        title {
          text
          type
        }
        series{
          name
          id
        }
        contents{
          thumb
          name
          videoId
          program{
            name
          }
        }
      }
    }`;
  
    graphqlApi(query).then(response => {
      const {
        title: titleArray,
        series,
        contents: contentList,
      } = response.data.getMainSeries;
  
      title = titleArray;
      seriesId = series.id;
      seriesName = series.name;
      contents = contentList;
    });
  });
</script>

<CenterSection type='inner' >
  <Title
    onClick={handleTitleClick}
    {title}
  />
  
  <ImageListView
    {contents}
    onClick={handleItemClick}
  />
  <MoreButton
    value="{seriesName} 시리즈 보러가기"
    onClick={handleButtonClick}
  />
</CenterSection>
