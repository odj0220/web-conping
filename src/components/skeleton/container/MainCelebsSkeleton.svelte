<script lang="ts">
  import Container from '$component/common/layout/Container.svelte';
  import Bar from '../unit/Bar.svelte';
  import MoreButton from '../component/MoreButton.svelte';
  import List from '../unit/List.svelte';
  import CelebsItem from '../component/CelebsItem.svelte';

</script>

<Container margin="5.6rem 0 0">
  <Bar width="12.2rem" height="2rem" margin="0 0 1.2rem" bgColor="bg-black-21" />
  <List direction="column">
    <CelebsItem margin="0 0 1.6rem 0" display="flex" direction="row"/>
    <CelebsItem margin="0 0 1.6rem 0" display="flex" direction="row"/>
    <CelebsItem display="flex" direction="row"/>
  </List>
  <MoreButton margin="1.6rem 0 0 0" bgColor="bg-black-21" />
</Container>
