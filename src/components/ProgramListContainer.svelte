<script lang=ts>
  import Tabs from './Tabs.svelte';
  import EpisodeContainer from './EpisodeContainer.svelte';
  import HighlightContainer from './HighlightContainer.svelte';
  import ShortsContainer from './ShortsContainer.svelte';
  
  export let id: string;

  // TODO: id data 가져오기

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

<Tabs {items} />
