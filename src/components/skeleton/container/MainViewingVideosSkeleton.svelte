<script lang="ts">
  import Container from '$component/common/layout/Container.svelte';
  import ViewingVideoList from '../component/ViewingVideoList.svelte';
  import Bar from '../unit/Bar.svelte';
  import Rect from '../unit/Rect.svelte';

</script>

<Container margin="2rem 0 0">
  <Rect height="190px" borderRadius="0.4rem" padding="1.6rem 1.2rem 2.6rem">
    <Bar margin="0 0 1.6rem" height="2rem" width="8.7rem" />
    <ViewingVideoList />
  </Rect>
</Container>
