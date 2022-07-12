<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  
  import { graphqlApi } from '$lib/_api_graphql';
  
  import CenterSection from '../styles/CenterSection.svelte';
  import ImageListView from './ImageListView.svelte';
  import Button from './Button.svelte';
  import Title from './Title.svelte';
import GrayBox from './CenterSection.svelte';
import MoreButton from './common/shared/MoreButton.svelte';
  
  const move = (targetUrl) => {
    goto(targetUrl);
  };

  const handleTitleClick = () => {
    move(`/programs/${seriesId}`);
  };

  const handleItemClick = (id) => {
    //TODO: 상세 화면으로 이동
    console.log('TODO: click 이벤트', id);
  };

  const handleButtonClick = () => {
    move(`/programs/${seriesId}`);
  };
  

  onMount(async () => {
    const query = '{getMainSeries{title {text type} series {name id} contents {thumb name videoId program {name}}}}';
    graphqlApi(query).then(response => {
      const { title: titleArray, series, contents: contentList } = response.data.getMainSeries;
      title = titleArray;
      seriesId = series.id;
      seriesName = series.name;
      contents = contentList;
    });
  });

  let contents = [];
  let title = [];
  let seriesId;
  let seriesName;

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
  .section {
    margin-top: 5.6rem;
  }
</style>