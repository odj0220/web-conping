<script lang="ts">
  import List from '../unit/List.svelte';
  import VideoItem from './VideoItem.svelte';

</script>

<List direction="column">
  <VideoItem margin="0 0 1.2rem 0" display="flex" direction="row"/>
  <VideoItem margin="0 0 1.2rem 0" display="flex" direction="row"/>
  <VideoItem margin="0 0 1.2rem 0" display="flex" direction="row"/>
  <VideoItem margin="0 0 1.2rem 0" display="flex" direction="row"/>
  <VideoItem display="flex" direction="row"/>
</List>
