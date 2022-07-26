<script>
  import Item from './unit/Item.svelte';
  import List from './unit/List.svelte';
  import PreviewVideoSkeleton from './unit/PreviewVideoSkeleton.svelte';

</script>

<List direction="column">
  <Item margin="0 0 1.6rem 0">
    <PreviewVideoSkeleton />
  </Item>
  <Item>
    <PreviewVideoSkeleton />
  </Item>
</List>