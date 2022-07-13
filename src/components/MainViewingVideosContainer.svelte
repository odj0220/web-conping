<script lang="ts">
  import { onMount } from 'svelte';
  
  import { getList } from '$lib/_continue_watching';
  
  import { goto } from '$app/navigation';
  
  import type { Content } from 'src/global/types';

  import Hscroller from './HorizontalScroller.svelte';
  import CenterSection from '$styles/CenterSection.svelte';

  import Title from './Title.svelte';
  import ViewingVodList from './ViewingVodList.svelte';

  let contents: Content[] = [];

  onMount(async () => {
    contents = await getList();
  });

  function handleClickContents(id: string) {
    goto(`/contents/${id}`);
  }

</script>

{#if contents.length > 0}
  <CenterSection type='inner'>
    <Title
      title={[{ text: '시청중인 영상' }]}
    />
    <Hscroller>
      <ViewingVodList {contents} onClick={handleClickContents} />
    </Hscroller>
  </CenterSection>
{/if}
