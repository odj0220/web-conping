<script lang="ts">
  import { graphqlApi } from '$lib/_api';

  import { callShare } from '../lib/_app_communication';

  import EpisodeContainer from './EpisodeContainer.svelte';
  import HighlightContainer from './HighlightContainer.svelte';
  import ShortsContainer from './ShortsContainer.svelte';
  import SubHeaderContainer from './SubHeaderContainer.svelte';
  import Metadata from '$component/Metadata.svelte';
  import ProgramDetailBanner from '$component/ProgramDetailBanner.svelte';
  import Tabs from '$component/common/layout/Tabs.svelte';
  import Container from '$component/common/layout/Container.svelte';
  import ProgramDetailSkeleton from '$component/skeleton/container/ProgramDetailSkeleton.svelte';

  import type { ITabItem } from 'src/global/types';

  export let id: string;

  const tabItems = [
    {
      label: '에피소드',
      index: 0,
      component: EpisodeContainer,
    },
    {
      label: '하이라이트',
      index: 1,
      component: HighlightContainer,
    },
    {
      label: '쇼츠',
      index: 2,
      component: ShortsContainer,
    },
  ];

  async function loadData() {
    const query = `{
      program(id:"${id}"){
        id
        title
        description
        banner
        regularAiringAt
        airingBeginAt
        airingEndAt
        totalEpisode
      }

      getCelebsByProgramId(id:"${id}"){
        id
        thumbnail
        name
        categories {
          id
          name
          fontColor
          backColor
        }
      }
    }`;

    const { data: { program, getCelebsByProgramId: celebs } } = await graphqlApi(query);
  
    return {
      program,
      celebs,
    };
  }
  let selectedTab:ITabItem = tabItems[0];

  function handleClickTab(index: number) {
    selectedTab = tabItems[index];
  }

  function onClickShare() {
    callShare('programs', id);
  }

</script>

{#await loadData()}
<ProgramDetailSkeleton />
{:then {program, celebs}}
  <SubHeaderContainer title={program.title} onClickShare={onClickShare}/>
  <Container type="full">
    <ProgramDetailBanner src={program.banner} alt={program.title} />

    <Metadata {program} {celebs}/>

    <Tabs
      {selectedTab}
      {tabItems}
      onClickTab={handleClickTab}
    />
    <svelte:component this={selectedTab.component} category={program.title} {id}/>
  </Container>
{/await}
