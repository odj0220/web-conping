<script lang=ts>
  import { onMount } from 'svelte';

  import { graphqlApi } from '$lib/_api_graphql';

  import type { Program } from 'src/global/types';
  
  import Metadata from './Metadata.svelte';
  import Tabs from './Tabs.svelte';
  import EpisodeContainer from './EpisodeContainer.svelte';
  import HighlightContainer from './HighlightContainer.svelte';
  import ShortsContainer from './ShortsContainer.svelte';
  import SubHeaderContainer from './SubHeaderContainer.svelte';

  export let id: string;
  let program: Program;
  let celebs = [];
  let items = [
    { label: '에피소드',
      value: 1,
      props: { id },
      component: EpisodeContainer,
    },
    { label: '하이라이트',
      value: 2,
      props: { id },
      component: HighlightContainer,
    },
    { label: '쇼츠',
      value: 3,
      props: { id },
      component: ShortsContainer,
    },
  ];

  onMount(async () => {
    const query = `{
      program(id:"${id}"){
        id
        title
        description
        thumbnail
        banner
      } 
      getCelebsByProgramId(id:"${id}"){
        thumbnail
        name
        categories
      }
    }`;
  
    const { data } = await graphqlApi(query);

    program = data?.program;
    celebs = data?.getCelebsByProgramId;
  });
</script>

<SubHeaderContainer title={program?.name} />
<div class="container">
  {#if program?.banner }
    <div class="visual">
      <img src={program?.banner} alt="banner 이미지"/>
    </div>
  {/if}                             
  <Metadata name={program?.name} description={program?.description} {celebs} />
</div>

<section class="tabs-wrapper">
  <Tabs {items} />
</section>

<style lang="scss">
  @import '../styles/variables.scss';

  .container {
    .visual {
      border-radius: 4px;
      overflow: hidden;
      margin: 0.8rem 1.6rem;
      height: 0;
      padding-bottom: 141%;
      position: relative;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
  }
  .gap {
    width: 100%;
    height: 8px;
    background-color: $bg-black-21;
  }

  .tabs-wrapper {
    padding-bottom: 13.4rem;
  }
  
</style>

  
