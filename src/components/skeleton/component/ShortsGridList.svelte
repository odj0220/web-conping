<script>
import Container from '$component/common/layout/Container.svelte';
import Bar from '../unit/Bar.svelte';
import Item from '../unit/Item.svelte';
import List from '../unit/List.svelte';
import Rect from '../unit/Rect.svelte';

</script>
<Container margin="5.6rem 0 0">
  <Bar width="7.7rem" height="2rem" margin="0 0 1.6rem" bgColor="bg-black-21" />
  <List>
    <Item margin="0 1.2rem 0 0">
      <Rect width="14.4rem" height="24rem" />
    </Item>
    <Item margin="0 1.2rem 0 0">
      <Rect width="14.4rem" height="24rem" />
    </Item>
    <Item>
      <Rect width="14.4rem" height="24rem" />
    </Item>
  </List>
</Container>