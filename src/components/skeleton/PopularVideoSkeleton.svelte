<script>
  import Container from '$component/common/layout/Container.svelte';
import PreviewVideoListSkeleton from './PreviewVideoListSkeleton.svelte';
  import Bar from './unit/Bar.svelte';

</script>

<Container margin="4rem 0 0" type="full">
  <Bar width="13.2rem" height="2rem" margin="0 1.6rem 1.2rem" bgColor="bg-black-21" />
  <PreviewVideoListSkeleton />
</Container>
