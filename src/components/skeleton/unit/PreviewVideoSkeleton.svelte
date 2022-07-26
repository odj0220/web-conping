<script lang="ts">
  import Bar from './Bar.svelte';
  import Circle from './Circle.svelte';
  import Image from './Image.svelte';
  import Rect from './Rect.svelte';

</script>

<Rect borderRadius="0.4rem" margin="0 1.6rem">
  <Image height="56.2%" />
  <Rect bgColor="bg-black-21" padding="1.2rem">
    <Bar width="80%" height="1.3rem" margin="0 0 0.4rem" />
    <Bar width="60%" height="1.3rem" margin="0 0 0.2rem"/>
    <Rect margin="0.8rem 0 0" flex={true} >
      <Circle size={2.4} margin="0 0.8rem 0 0"/>
      <Bar width="12rem" height="1.2rem" />
    </Rect>
  </Rect>
</Rect>