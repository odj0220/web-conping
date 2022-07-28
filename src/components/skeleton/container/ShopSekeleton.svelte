<script lang="ts">
  import Container from '$component/common/layout/Container.svelte';
import Bar from '../unit/Bar.svelte';
import Item from '../unit/Item.svelte';
import List from '../unit/List.svelte';
import Rect from '../unit/Rect.svelte';
import Thumbnail from '../unit/Thumbnail.svelte';

</script>
<Container margin="3.2rem 0 0">
  <List direction="column">
    <Item margin="0 0 3.2rem" display="flex" direction="row" align="center">
      <Thumbnail width="15.6rem" height="15.6rem" borderRadius="0.4rem" />
      <Rect padding="0 0 0 1.6rem">
        <Bar height="1.1rem" bgColor="bg-black-21" margin="0 0 0.6rem 0"/>
        <Bar width="13rem" height="1.2rem" bgColor="bg-black-21" margin="0 0 0.4rem 0"/>
        <Bar width="12rem" height="1.2rem" bgColor="bg-black-21" margin="0 0 1.2rem 0"/>
        <Bar width="8rem" height="2rem" bgColor="bg-black-21" margin="0 0 0.4rem 0"/>
      </Rect>
    </Item>
    <Item margin="0 0 3.2rem" display="flex" direction="row" align="center">
      <Thumbnail width="15.6rem" height="15.6rem" borderRadius="0.4rem" />
      <Rect padding="0 0 0 1.6rem">
        <Bar height="1.1rem" bgColor="bg-black-21" margin="0 0 0.6rem 0"/>
        <Bar width="13rem" height="1.2rem" bgColor="bg-black-21" margin="0 0 0.4rem 0"/>
        <Bar width="12rem" height="1.2rem" bgColor="bg-black-21" margin="0 0 1.2rem 0"/>
        <Bar width="8rem" height="2rem" bgColor="bg-black-21" margin="0 0 0.4rem 0"/>
      </Rect>
    </Item>
    <Item margin="0 0 3.2rem" display="flex" direction="row" align="center">
      <Thumbnail width="15.6rem" height="15.6rem" borderRadius="0.4rem" />
      <Rect padding="0 0 0 1.6rem">
        <Bar height="1.1rem" bgColor="bg-black-21" margin="0 0 0.6rem 0"/>
        <Bar width="13rem" height="1.2rem" bgColor="bg-black-21" margin="0 0 0.4rem 0"/>
        <Bar width="12rem" height="1.2rem" bgColor="bg-black-21" margin="0 0 1.2rem 0"/>
        <Bar width="8rem" height="2rem" bgColor="bg-black-21" margin="0 0 0.4rem 0"/>
      </Rect>
    </Item>
    <Item margin="0 0 3.2rem" display="flex" direction="row" align="center">
      <Thumbnail width="15.6rem" height="15.6rem" borderRadius="0.4rem" />
      <Rect padding="0 0 0 1.6rem">
        <Bar height="1.1rem" bgColor="bg-black-21" margin="0 0 0.6rem 0"/>
        <Bar width="13rem" height="1.2rem" bgColor="bg-black-21" margin="0 0 0.4rem 0"/>
        <Bar width="12rem" height="1.2rem" bgColor="bg-black-21" margin="0 0 1.2rem 0"/>
        <Bar width="8rem" height="2rem" bgColor="bg-black-21" margin="0 0 0.4rem 0"/>
      </Rect>
    </Item>
    <Item margin="0 0 3.2rem" display="flex" direction="row" align="center">
      <Thumbnail width="15.6rem" height="15.6rem" borderRadius="0.4rem" />
      <Rect padding="0 0 0 1.6rem">
        <Bar height="1.1rem" bgColor="bg-black-21" margin="0 0 0.6rem 0"/>
        <Bar width="13rem" height="1.2rem" bgColor="bg-black-21" margin="0 0 0.4rem 0"/>
        <Bar width="12rem" height="1.2rem" bgColor="bg-black-21" margin="0 0 1.2rem 0"/>
        <Bar width="8rem" height="2rem" bgColor="bg-black-21" margin="0 0 0.4rem 0"/>
      </Rect>
    </Item>
  </List>
</Container>