<script lang="ts">
import Bar from '../unit/Bar.svelte';
import Circle from '../unit/Circle.svelte';
import Item from '../unit/Item.svelte';
import Rect from '../unit/Rect.svelte';

export let margin = '';
export let display = '';
export let direction = '';

</script>

<Item margin={margin} display={display} direction={direction}>
  <Rect width="100%" padding="1.2rem 1.6rem" flex={true} borderRadius="0.4rem" bgColor="bg-black-21">
    <Circle size={7.2} />
    <Rect margin="0 0 0 1.2rem">
      <Bar width="4.2rem" height="2rem" margin="0 0 0.7rem" />
      <Bar width="14rem" height="1.5rem" />
    </Rect>
  </Rect>
</Item>