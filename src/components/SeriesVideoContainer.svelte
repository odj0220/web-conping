<script>
import CenterSection from '../styles/CenterSection.svelte';
import GridViewList from './GridViewList.svelte';
import Button from './Button.svelte';
import { onMount } from 'svelte';
import Title from './Title.svelte';
import { graphqlApi } from '$lib/_api_graphql';

const handleClick = (id) => {
  console.log('TODO: click 이벤트', id);
};

let contents = [];
let seriesId;
let title = [];

onMount(async () => {
  const query = '{getMainSeries{title {text type} series {name id} contents {thumb name videoId program {name}}}}';
  graphqlApi(query).then(response => {
    const { title: titleArray, series, contents: contentList } = response.data.getMainSeries;
    title = titleArray;
    seriesId = series.id;
    contents = contentList;
  });
});

</script>

<CenterSection>
  <Title {title}></Title>
  
  <GridViewList
    {contents}
    onClick={handleClick}
  />

  <Button
    buttonName={'랜선뷰티 시리즈 보러가기'}
    onClick={handleClick}
  />
</CenterSection>
