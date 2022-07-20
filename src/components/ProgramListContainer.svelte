<script lang=ts>
import { graphqlApi } from '$lib/_api';
import type { IProgram } from 'src/global/types';

import Metadata from './Metadata.svelte';
import Tabs from './Tabs.svelte';
import EpisodeContainer from './EpisodeContainer.svelte';
import HighlightContainer from './HighlightContainer.svelte';
import ShortsContainer from './ShortsContainer.svelte';
import SubHeaderContainer from './SubHeaderContainer.svelte';
import Container from './common/layout/Container.svelte';

export let id: string;
let items = [
  { label: '에피소드',
    index: 0,
    props: { id },
    component: EpisodeContainer,
  },
  { label: '하이라이트',
    index: 1,
    props: { id },
    component: HighlightContainer,
  },
  { label: '쇼츠',
    index: 2,
    props: { id },
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
    }

    getCelebsByProgramId(id:"${id}"){
      thumbnail
      name
      categories
    }
  }`;

  const result = await graphqlApi(query);
  const program: IProgram = result?.data?.program;
  const celobs = result?.data.getCelebsByProgramId;
  const metaDataOption = setMetadataOption(program, celobs);

  return new Promise((resolve, reject) => {
    resolve({
      program,
      celobs,
      metaDataOption,
    });
  });
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
      },
    },
  };

  return newData;
}
</script>

{#await loadData()}
{:then {program, celobs, metaDataOption}}
  <SubHeaderContainer title={program.title} />
  <Container type="full">
    <section class="thumbnail-wrapper">
      <img class="thumbnail" src={program.banner} alt=""/>
    </section>

    <Metadata option={metaDataOption}/>

    <Tabs {items} programTitle={program.title}/>
  </Container>
{/await}

<style lang="scss">
  .thumbnail-wrapper {
    border-radius: 4px;
    overflow: hidden;
    margin: 0.8rem 1.6rem;
    height: 0;
    padding-bottom: 141%;
    position: relative;
    img.thumbnail {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
  .gap {
    width: 100%;
    height: 8px;
    background-color: $bg-black-21;
  }
  
</style>

  
