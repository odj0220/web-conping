<script>
  import Container from '$component/common/layout/Container.svelte';
  import Bar from './unit/Bar.svelte';
  import List from './unit/List.svelte';
  import Rect from './unit/Rect.svelte';
  import Item from './unit/Item.svelte';
  import Circle from './unit/Circle.svelte';

</script>

<Container margin="2rem 0 0">
  <Rect height="190px" borderRadius="0.4rem" padding="1.6rem 1.2rem 2.6rem" margin="0 0 1.6rem">
    <Bar margin="0 0 1.6rem" height="2rem" width="8.7rem" />
    <List>
      <Item marginRight="2rem" align="center">
        <Circle size={8} margin="0 0 0.4rem" />
        <Bar margin="0 0 0.4rem" height="1.1rem" line={2} width="8rem" />
        <Bar margin="0 0 1.6rem" height="1.1rem" line={2} width="6rem" />
      </Item>
      <Item marginRight="2rem" align="center">
        <Circle size={8} margin="0 0 0.4rem" />
        <Bar margin="0 0 0.4rem" height="1.1rem" line={2} width="8rem" />
        <Bar margin="0 0 1.6rem" height="1.1rem" line={2} width="6rem" />
      </Item>
      <Item marginRight="2rem" align="center">
        <Circle size={8} margin="0 0 0.4rem" />
        <Bar margin="0 0 0.4rem" height="1.1rem" line={2} width="8rem" />
        <Bar margin="0 0 1.6rem" height="1.1rem" line={2} width="6rem" />
      </Item>
      <Item align="center">
        <Circle size={8} margin="0 0 0.4rem" />
        <Bar margin="0 0 0.4rem" height="1.1rem" line={2} width="8rem" />
        <Bar margin="0 0 1.6rem" height="1.1rem" line={2} width="6rem" />
      </Item>
    </List>
  </Rect>
</Container>
