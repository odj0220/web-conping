<script>
import Container from '$component/common/layout/Container.svelte';
import CelebsItem from '../component/CelebsItem.svelte';
import List from '../unit/List.svelte';

</script>
<Container margin="0 1.6rem 0">
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