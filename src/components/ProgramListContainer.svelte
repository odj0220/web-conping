<script lang=ts>
  import { onMount } from 'svelte';

  import { graphqlApi } from '$lib/_api_graphql';

  import Metadata from './Metadata.svelte';
  import Tabs from './Tabs.svelte';
  import EpisodeContainer from './EpisodeContainer.svelte';
  import HighlightContainer from './HighlightContainer.svelte';
  import ShortsContainer from './ShortsContainer.svelte';
  import SubHeaderContainer from './SubHeaderContainer.svelte';

  let data = {};

  onMount(async () => {
    const query = `{program(id:"${id}"){id name description bannerImg}}`;
    const result = await graphqlApi(query);
    data = result?.data?.program;
  });

  export let id: string;

  let items = [
    { label: '에피소드',
      value: 1,
      id,
      component: EpisodeContainer,
    },
    { label: '하이라이트',
      value: 2,
      id,
      component: HighlightContainer,
    },
    { label: '쇼츠',
      value: 3,
      id,
      component: ShortsContainer,
    },
  ];
</script>

<SubHeaderContainer title={data?.name} />
<div class="container">                             
  <div class="visual">
    <img src={data?.bannerImg} alt=""/>
  </div>
  <Metadata name={data?.name} description={data?.description} />
</div>
<Tabs {items} />

<style lang="scss">
  @import '../styles/variables.scss';

  .container {
    .visual {
      border-radius: 4px;
      overflow: hidden;
      margin: 0.8rem 1.6rem;
      img {
        width: 100%;
      }
    }
  }
  .gap {
    width: 100%;
    height: 8px;
    background-color: $bg-black-21;
  }
  
</style>

  
