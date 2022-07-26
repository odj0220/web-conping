<script lang="ts">
  import Container from '$component/common/layout/Container.svelte';
  import Thumbnail from './unit/Thumbnail.svelte';
  import Bar from './unit/Bar.svelte';
  import Item from './unit/Item.svelte';
  import List from './unit/List.svelte';
  import Rect from './unit/Rect.svelte';
  import MoreButton from './unit/MoreButton.svelte';

</script>

<Container margin="5.6rem 0 0">
  <Rect borderRadius="0.4rem" padding="1.6rem 1.2rem">
    <Bar width="23.5rem" height="2rem" margin="0 0 1.6rem" />
    <List direction="column">
      <Item margin="0 0 1.2rem 0" display="flex" direction="row">
        <Thumbnail width="12rem" height="6.8rem" borderRadius="0.2rem" bgColor="bg-gray-32"/>
        <Rect margin="0 0 0 1.2rem">
          <Bar width="8rem" height="1.2rem" margin="0 0 0.6rem" />
          <Bar width="14rem" height="1.2rem" margin="0 0 0.3rem" />
          <Bar width="12rem" height="1.2rem" />
        </Rect>
      </Item>
      <Item margin="0 0 1.2rem 0" display="flex" direction="row">
        <Thumbnail width="12rem" height="6.8rem" borderRadius="0.2rem" bgColor="bg-gray-32"/>
        <Rect margin="0 0 0 1.2rem">
          <Bar width="8rem" height="1.2rem" margin="0 0 0.6rem" />
          <Bar width="14rem" height="1.2rem" margin="0 0 0.3rem" />
          <Bar width="12rem" height="1.2rem" />
        </Rect>
      </Item>
      <Item margin="0 0 1.2rem 0" display="flex" direction="row">
        <Thumbnail width="12rem" height="6.8rem" borderRadius="0.2rem" bgColor="bg-gray-32"/>
        <Rect margin="0 0 0 1.2rem">
          <Bar width="8rem" height="1.2rem" margin="0 0 0.6rem" />
          <Bar width="14rem" height="1.2rem" margin="0 0 0.3rem" />
          <Bar width="12rem" height="1.2rem" />
        </Rect>
      </Item>
      <Item margin="0 0 1.2rem 0" display="flex" direction="row">
        <Thumbnail width="12rem" height="6.8rem" borderRadius="0.2rem" bgColor="bg-gray-32"/>
        <Rect margin="0 0 0 1.2rem">
          <Bar width="8rem" height="1.2rem" margin="0 0 0.6rem" />
          <Bar width="14rem" height="1.2rem" margin="0 0 0.3rem" />
          <Bar width="12rem" height="1.2rem" />
        </Rect>
      </Item>
      <Item display="flex" direction="row">
        <Thumbnail width="12rem" height="6.8rem" borderRadius="0.2rem" bgColor="bg-gray-32"/>
        <Rect margin="0 0 0 1.2rem">
          <Bar width="8rem" height="1.2rem" margin="0 0 0.6rem" />
          <Bar width="14rem" height="1.2rem" margin="0 0 0.3rem" />
          <Bar width="12rem" height="1.2rem" />
        </Rect>
      </Item>
    </List>
    <MoreButton bgColor="bg-gray-32" />
  </Rect>
</Container>