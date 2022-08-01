<script lang="ts">
  import Thumbnail from '../unit/Thumbnail.svelte';
  import Bar from '../unit/Bar.svelte';
  import Item from '../unit/Item.svelte';
  import Rect from '../unit/Rect.svelte';

  export let margin = '0';
  export let display = 'block';
  export let direction = 'column';

</script>

<Item margin={margin} display={display} direction={direction}>
  <Thumbnail width="12rem" height="6.8rem" borderRadius="0.2rem"/>
  <Rect margin="0 0 0 1.2rem">
    <Bar width="8rem" height="1.2rem" margin="0 0 0.6rem" />
    <Bar width="14rem" height="1.2rem" margin="0 0 0.3rem" />
    <Bar width="12rem" height="1.2rem" />
  </Rect>
</Item>
