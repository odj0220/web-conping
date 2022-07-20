<script lang="ts">
  import { page } from '$app/stores';

  import ContentsDetailContainer from '$container/ContentsDetailContainer.svelte';

  const id = $page.params.id;
</script>

<ContentsDetailContainer {id} />
