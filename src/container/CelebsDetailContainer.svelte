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
import CelebsDetailSkeleton from '$component/skeleton/container/CelebsDetailSkeleton.svelte';

  export let id: string;

  const getData = async () => {
    const query = `
      {
        celeb(id:"${id}"){
          name
          description
          thumbnail,
          countOfYoutubeFollowers
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

  function handleClickTab(index: number) {
    selectedTab = tabItems[index];
    window.scrollTo(0, 0);
  }

  function onClickShare() {
    callShare('celebs', id);
  }
</script>

{#await getData()}
<CelebsDetailSkeleton />
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

    {#if selectedTab.index === 0}
      <CelebsAllContentsContainer
              {id}
              onClickMoreButton={handleClickTab}
              category={data.name}
      />
    {/if}

    {#if selectedTab.index === 1}
      <CelebsProductContainer {id} category={data.name}/>
    {/if}


    {#if selectedTab.index === 2}
      <CelebsContentsContainer {id} category={data.name}/>
    {/if}

    {#if selectedTab.index === 3}
      <CelebsShortsContainer {id} category={data.name}/>
    {/if}
  </Container>
{/await}
