<script>
  import { onMount } from 'svelte';
  
  import { goto } from '$app/navigation';

  import CenterSection from '../styles/CenterSection.svelte';
  import GridViewList from './GridViewList.svelte';
  import Button from './Button.svelte';
  import Title from './Title.svelte';

  const handleItemClick = (id) => {
    console.log('TODO: click 이벤트', id);
  };

  const handleButtonClick = () => {
    console.log('TODO: click 이벤트');
    goto(`/programs/${contents.programId}`);
  };

  let contents = [];
  let title = [];
  let seriesId;

  onMount(async () => {
    const body = {
      query: '{getMainSeries{title {text type} series {name id} contents {thumb name videoId programId program {name}}}}',
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
      contents = contentList;
    });
  });
</script>

<CenterSection>
  <Title {title}></Title>
  
  <GridViewList
    {contents}
    onClick={handleItemClick}
  />

  <!-- TODO: 버튼명 하드코딩 수정 -->
  <Button
    buttonName={'랜선뷰티 시리즈 보러가기'}
    onClick={handleButtonClick}
  />
</CenterSection>
