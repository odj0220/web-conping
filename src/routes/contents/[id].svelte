<script>
  import { page } from '$app/stores';

  import ContentsDetailContainer from '$component/ContentsDetailContainer.svelte';

  const id = $page.params.id;
</script>

<ContentsDetailContainer {id} />
