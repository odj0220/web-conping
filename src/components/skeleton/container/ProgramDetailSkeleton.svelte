<script lang="ts">
import Container from '$component/common/layout/Container.svelte';
import MetadataCelebs from '../component/MetadataCelebs.svelte';
import Bar from '../unit/Bar.svelte';
import Circle from '../unit/Circle.svelte';
import Image from '../unit/Image.svelte';
import Item from '../unit/Item.svelte';
import List from '../unit/List.svelte';
import Rect from '../unit/Rect.svelte';

</script>
<Container margin="0 0 4rem" type="full">
  <Rect margin="6.2rem 1.6rem 0">
    <Image height="141%" />
  </Rect>
  <MetadataCelebs />
  <Rect margin="2.4rem 1.6rem 0" bgColor="bg-black-21" padding="1.6rem 1.2rem">
    <Bar height="2rem" bgColor="bg-gray-32" margin="0 0 1.6rem" />
    <List>
      <Item  margin="0 2rem 0 0" align="center" display="flex">
        <Circle size={8} margin="0 0 0.8rem" />
        <Bar margin="0 0 0.4rem" height="1.1rem" width="4rem" />
      </Item>
      <Item  margin="0 2rem 0 0" align="center" display="flex">
        <Circle size={8} margin="0 0 0.8rem" />
        <Bar margin="0 0 0.4rem" height="1.1rem" width="4rem" />
      </Item>
      <Item  margin="0 2rem 0 0" align="center" display="flex">
        <Circle size={8} margin="0 0 0.8rem" />
        <Bar margin="0 0 0.4rem" height="1.1rem" width="4rem" />
      </Item>
      <Item  margin="0 2rem 0 0" align="center" display="flex">
        <Circle size={8} margin="0 0 0.8rem" />
        <Bar margin="0 0 0.4rem" height="1.1rem" width="4rem" />
      </Item>
    </List>
  </Rect>
</Container>