<script>
import PreviewVideo from './PreviewVideo.svelte';
import Item from '../unit/Item.svelte';
import List from '../unit/List.svelte';

</script>

<List direction="column">
  <Item margin="0 0 1.6rem 0">
    <PreviewVideo />
  </Item>
  <Item>
    <PreviewVideo />
  </Item>
</List>