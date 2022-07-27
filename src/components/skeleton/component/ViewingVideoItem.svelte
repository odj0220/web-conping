<script lang="ts">
  import Bar from '../unit/Bar.svelte';
  import Circle from '../unit/Circle.svelte';
  import Item from '../unit/Item.svelte';

  export let margin = '0';
  export let align = 'flex-start';
  export let display = 'block';

</script>

<Item margin={margin} align={align} display={display}>
  <Circle size={8} margin="0 0 0.4rem" />
  <Bar margin="0 0 0.4rem" height="1.1rem" width="8rem" />
  <Bar margin="0 0 1.6rem" height="1.1rem" width="6rem" />
</Item>
