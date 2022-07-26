<script>
import Container from '$component/common/layout/Container.svelte';
import Thumbnail from './unit/Thumbnail.svelte';
import Bar from './unit/Bar.svelte';
import Item from './unit/Item.svelte';
import List from './unit/List.svelte';
import Rect from './unit/Rect.svelte';

</script>
<Container margin="5.6rem 1.6rem 0" type="full">
  <Bar width="8.7rem" height="2rem" margin="0 0 1.2rem" bgColor="bg-black-21" />
  <List>
    <Item margin="0 1.2rem 0 0">
      <Rect width="14.4rem" height="20.3rem" margin="0 0 0.8rem">
        <Thumbnail width="14.4rem" height="20.3rem" borderRadius="0.4rem" />
      </Rect>
      <Bar width="8.7rem" height="1.6rem" margin="0.8rem 0 0" bgColor="bg-black-21" />
    </Item>
    <Item margin="0 1.2rem 0 0">
      <Rect width="14.4rem" height="20.3rem" margin="0 0 0.8rem">
        <Thumbnail width="14.4rem" height="20.3rem" borderRadius="0.4rem" />
      </Rect>
      <Bar width="8.7rem" height="1.6rem" margin="0.8rem 0 0" bgColor="bg-black-21" />
    </Item>
    <Item>
      <Rect width="14.4rem" height="20.3rem" margin="0 0 0.8rem">
        <Thumbnail width="14.4rem" height="20.3rem" borderRadius="0.4rem" />
      </Rect>
      <Bar width="8.7rem" height="1.6rem" margin="0.8rem 0 0" bgColor="bg-black-21" />
    </Item>
  </List>
</Container>