<script lang="ts">
  import Container from '$component/common/layout/Container.svelte';
  import MoreButton from '../component/MoreButton.svelte';
  import VideoList from '../component/VideoList.svelte';
  import Bar from '../unit/Bar.svelte';
  import Rect from '../unit/Rect.svelte';

</script>

<Container margin="5.6rem 0 0">
  <Rect borderRadius="0.4rem" padding="1.6rem 1.2rem">
    <Bar width="23.5rem" height="2rem" margin="0 0 1.6rem" />
    <VideoList />
    <MoreButton bgColor="bg-gray-32" />
  </Rect>
</Container>