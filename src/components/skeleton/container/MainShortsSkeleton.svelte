<script lang="ts">
  import Container from '$component/common/layout/Container.svelte';
  import ShortsGridList from '../component/ShortsGridList.svelte';
  import Bar from '../unit/Bar.svelte';

</script>

<Container margin="5.6rem 0 0">
  <Bar width="7.7rem" height="2rem" margin="0 0 1.6rem" bgColor="bg-black-21" />
  <ShortsGridList />
</Container>
