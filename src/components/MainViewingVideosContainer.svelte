<script lang="ts">
import { onMount } from 'svelte';
import { getContinueWatchingList } from '$lib/_continue_watching';
import type { IContent } from 'src/global/types';
import Title from './Title.svelte';
import ViewingVodList from './ViewingVodList.svelte';
import Container from './common/layout/Container.svelte';

let contents: IContent[] = [];

onMount(async () => {
  contents = await getContinueWatchingList();
});

function handleClickContents(id: string) {
  window.location.href = `/contents/${id}`;
}

</script>

{#if contents.length > 0}
  <Container type="grayBox wide" margin="2rem 1.6rem 0">
    <Title
      title={[{ text: '시청중인 영상' }]}
      marginLeft="1.2rem"
      marginBottom="1.6rem"
    />
    <ViewingVodList {contents} onClick={handleClickContents} />
  </Container>
{/if}
