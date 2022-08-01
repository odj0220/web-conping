<script lang="ts">
  import { page } from '$app/stores';

  import ShortsDetailContainer from '$container/ShortsDetailContainer.svelte';

  const id = $page.params.id;
</script>
    
<ShortsDetailContainer {id} />
