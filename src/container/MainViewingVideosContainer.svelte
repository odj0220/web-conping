<script lang="ts">
  import { getContinueWatchingList } from '$lib/_continue_watching';
  import { gotoContents } from '$lib/utils/goto';

  import Container from '$component/common/layout/Container.svelte';
  import Title from '$component/Title.svelte';
  import ViewingVodList from '$component/ViewingVodList.svelte';
  import MainViewingVideosSkeleton from '$component/skeleton/MainViewingVideosSkeleton.svelte';

</script>

{#await getContinueWatchingList()}
<MainViewingVideosSkeleton />
{:then contents}
  {#if contents.length > 0}
    <Container type="grayBox wide" margin="2rem 1.6rem 0">
      <Title
              title={[{ text: '시청중인 영상' }]}
              marginLeft="1.2rem"
              marginBottom="1.6rem"
      />
      <ViewingVodList {contents} onClick={gotoContents} />
    </Container>
  {/if}
{/await}
