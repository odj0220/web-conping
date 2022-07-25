<script lang="ts">
  import { graphqlApi } from '$lib/_api';

  import type { IProgram, ITabItem } from 'src/global/types';

  import EpisodeContainer from './EpisodeContainer.svelte';
  import HighlightContainer from './HighlightContainer.svelte';
  import ShortsContainer from './ShortsContainer.svelte';
  import SubHeaderContainer from './SubHeaderContainer.svelte';
  import Metadata from '$component/Metadata.svelte';
  import HeaderBanner from '$component/HeaderBanner.svelte';

  import Tabs from '$component/common/layout/Tabs.svelte';
  import Container from '$component/common/layout/Container.svelte';
  import Spinner from '$component/common/shared/Spinner.svelte';

  export let id: string;

  const items = [
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

  let selectedTab = items[0];

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

    const result = await graphqlApi(query);
    const program: IProgram = result?.data?.program;
    const celobs = result?.data.getCelebsByProgramId;
    const metaDataOption = setMetadataOption(program, celobs);

    return {
      program,
      celobs,
      metaDataOption,
    };
  }

  function setMetadataOption (program: any, celebs: any[]) {
    const newData = {
      programDetail: {
        title: program.title,
        description: program.description,
        celebs,
        info: {
          airingBeginAt: program.airingBeginAt,
          airingEndAt: program.airingEndAt,
          regularAiringAt: program.regularAiringAt,
          totalEpisode: program.totalEpisode,
        },
      },
    };

    return newData;
  }

  function handleClickTab(clickedTab: ITabItem) {
    selectedTab = clickedTab;
  }

</script>

{#await loadData()}
  <Spinner />
{:then {program, celobs, metaDataOption}}
  <SubHeaderContainer title={program.title} />
  <Container type="full">
    <HeaderBanner imagePath={program.banner} />

    <Metadata option={metaDataOption}/>

    <Tabs
      {items}
      {selectedTab}
      onClickTab={handleClickTab}
    />
    <svelte:component this={selectedTab.component} category={program.title}/>
  </Container>
{/await}
