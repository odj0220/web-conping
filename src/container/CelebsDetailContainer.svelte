<script type="ts">
  import { graphqlApi } from '$lib/_api';

  import Container from '$component/common/layout/Container.svelte';
  import Tabs from '$component/common/layout/Tabs.svelte';
  import CelebsProfile from '$component/CelebsProfile.svelte';
  import CelebsAllContentsContainer from './CelebsAllContentsContainer.svelte';
  import CelebsProductContainer from './CelebsProductContainer.svelte';
  import CelebsContentsContainer from './CelebsContentsContainer.svelte';
  import CelebsShortsContainer from './CelebsShortsContainer.svelte';
  import SubHeaderContainer from './SubHeaderContainer.svelte';

  import type { ITabItem } from 'src/global/types';
  import { callShare } from '../lib/_app_communication';

  export let id: string;

  const getData = async () => {
    const query = `
      {
        celeb(id:"${id}"){
          name
          description
          thumbnail
        }
      }
    `;
    const { data: { celeb } } = await graphqlApi(query);
    return celeb;
  };

  const tabItems = [
    {
      label: '전체',
      index: 0,
      component: CelebsAllContentsContainer,
    },
    {
      label: '상품',
      index: 1,
      component: CelebsProductContainer,
    },
    {
      label: '콘텐츠',
      index: 2,
      component: CelebsContentsContainer,
    },
    {
      label: '쇼츠',
      index: 3,
      component: CelebsShortsContainer,
    },
  ];

  let selectedTab:ITabItem = tabItems[0];

  function handleClickTab(clickedTab: ITabItem) {
    selectedTab = clickedTab;
  }

  function onClickShare() {
    callShare('celebs', id);
  }

</script>

{#await getData()}
{:then data}
  <Container margin="0 0 9.4rem" type="full">
    <SubHeaderContainer type="transparent" share={true} {onClickShare}/>
    <CelebsProfile {data}/>
    <Tabs
      {tabItems}
      {selectedTab}
      borderBottom={true}
      sticky={true}
      onClickTab={handleClickTab}
    />
    <svelte:component this={selectedTab.component} category={data.name}/>
  </Container>
{/await}
