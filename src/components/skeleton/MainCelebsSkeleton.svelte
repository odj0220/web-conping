<script lang="ts">
  import Container from '$component/common/layout/Container.svelte';
  import Thumbnail from '$component/common/shared/Thumbnail.svelte';
  import Bar from './unit/Bar.svelte';
import Circle from './unit/Circle.svelte';
  import Item from './unit/Item.svelte';
  import List from './unit/List.svelte';
import MoreButton from './unit/MoreButton.svelte';
  import Rect from './unit/Rect.svelte';

</script>

<Container margin="5.6rem 0 0">
  <Bar width="8.7rem" height="2rem" margin="0 0 1.2rem" bgColor="bg-black-21" />
  <List direction="column">
    <Item margin="0 0 1.2rem 0" display="flex" direction="row">
      <Rect width="100%" padding="1.2rem 1.6rem" flex={true} borderRadius="0.4rem">
        <Circle size={7.2} />
        <Rect margin="0 0 0 1.2rem">
          <Bar width="4.2rem" height="2rem" margin="0 0 0.7rem" />
          <Bar width="14rem" height="1.5rem" />
        </Rect>
      </Rect>
    </Item>
    <Item margin="0 0 1.2rem 0" display="flex" direction="row">
      <Rect width="100%" padding="1.2rem 1.6rem" flex={true} borderRadius="0.4rem">
        <Circle size={7.2} />
        <Rect margin="0 0 0 1.2rem">
          <Bar width="4.2rem" height="2rem" margin="0 0 0.7rem" />
          <Bar width="14rem" height="1.5rem" />
        </Rect>
      </Rect>
    </Item>
    <Item display="flex" direction="row">
      <Rect width="100%" padding="1.2rem 1.6rem" flex={true} borderRadius="0.4rem">
        <Circle size={7.2} />
        <Rect margin="0 0 0 1.2rem">
          <Bar width="4.2rem" height="2rem" margin="0 0 0.7rem" />
          <Bar width="14rem" height="1.5rem" />
        </Rect>
      </Rect>
    </Item>

  </List>
  <MoreButton margin="1.6rem 0 0 0" bgColor="bg-black-21" />
</Container>
