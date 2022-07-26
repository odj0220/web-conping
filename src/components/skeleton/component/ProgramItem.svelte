<script lang="ts">
  import Bar from '../unit/Bar.svelte';
  import Item from '../unit/Item.svelte';
  import Rect from '../unit/Rect.svelte';
  import Thumbnail from '../unit/Thumbnail.svelte';

  export let margin = '0';

</script>
<Item margin={margin}>
  <Rect width="14.4rem" height="20.3rem" margin="0 0 0.8rem">
    <Thumbnail width="14.4rem" height="20.3rem" borderRadius="0.4rem" />
  </Rect>
  <Bar width="8.7rem" height="1.6rem" margin="0.8rem 0 0" bgColor="bg-black-21" />
</Item>