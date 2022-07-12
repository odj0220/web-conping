<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  
  import { graphqlApi } from '$lib/_api_graphql';
  
  import CenterSection from '../styles/CenterSection.svelte';
  import ImageListView from './ImageListView.svelte';
  import Button from './Button.svelte';
  import Title from './Title.svelte';
import GrayBox from './CenterSection.svelte';
import MoreButton from './common/shared/MoreButton.svelte';

  import type { Content, TitleElement } from 'src/global/types';
  
  const move = (targetUrl: string) => {
    //TODO: 공통함수로 정리
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
    const query = '{getMainSeries{title {text type} series {name id} contents {thumb name videoId program {name}}}}';
  
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

  let contents: Content[];
  let title: TitleElement[] | null = null;
  let seriesId: string;
  let seriesName: string;

  onMount(async () => {
    const body = {
      query: '{getMainSeries{title {text type} series {name id} contents {thumb name videoId programId program {name id}}}}',
    };
    fetch('/api/graphql', {
      method: 'POST',
      body: JSON.stringify(body),
    }).then(response => {
      return response.json();
    }).then(response => {
      const { title: titleArray, series, contents: contentList } = response.data.getMainSeries;
      title = titleArray;
      seriesId = series.id;
      contents = contentList.slice(0, 5);
      seriesName = series.name;
    });
  });
</script>

<section class="section">
  <Title
    onClick={handleTitleClick}
    {title}
  />
  
  <ImageListView
    {contents}
    onClick={handleItemClick}
  />
  <MoreButton value="{seriesName} 시리즈 보러가기" onClick={handleButtonClick} />
</section>

<style lang="scss">
  @import "../styles/variables.scss";
  .section {
    margin: 5.6rem 1.6rem 0 1.6rem;
    padding: 1.6rem 1.2rem;
    background-color: $bg-black-21;
    border-radius: 0.4rem;
  }

</style>