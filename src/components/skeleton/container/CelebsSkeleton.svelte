<script>
import Container from '$component/common/layout/Container.svelte';
import CelebsItem from '../component/CelebsItem.svelte';
import Bar from '../unit/Bar.svelte';
import List from '../unit/List.svelte';
import Rect from '../unit/Rect.svelte';

</script>
<Container margin="0 0 4rem">
  <Rect height="5.4rem" flex={true} margin="0 0 0.8rem">
    <Bar height="2rem" bgColor="bg-black-21"/>
  </Rect>
  <List direction="column">
    <CelebsItem margin="0 0 1.6rem 0" display="flex" direction="row"/>
    <CelebsItem margin="0 0 1.6rem 0" display="flex" direction="row"/>
    <CelebsItem margin="0 0 1.6rem 0" display="flex" direction="row"/>
    <CelebsItem margin="0 0 1.6rem 0" display="flex" direction="row"/>
    <CelebsItem margin="0 0 1.6rem 0" display="flex" direction="row"/>
    <CelebsItem margin="0 0 1.6rem 0" display="flex" direction="row"/>
    <CelebsItem margin="0 0 1.6rem 0" display="flex" direction="row"/>
    <CelebsItem display="flex" direction="row"/>
  </List>
</Container>