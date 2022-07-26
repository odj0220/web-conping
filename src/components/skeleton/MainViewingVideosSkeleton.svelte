<script>
  import Container from '$component/common/layout/Container.svelte';
  import Bar from './unit/Bar.svelte';
  import Circle from './unit/Circle.svelte';
  import Rect from './unit/Rect.svelte';

</script>

<Container margin="2rem 0 0">
  <Rect height="190px" borderRadius="0.4rem" padding="1.6rem 1.2rem 2.6rem" margin="0 0 1.6rem">
    <Bar margin="0 0 1.6rem" height="2rem"/>
    <Circle size={8} margin="0 0 0.4rem" />
    <Bar margin="0 0 1.6rem" height="2.8rem" line={2}/>
  </Rect>
</Container>
