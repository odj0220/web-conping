<script lang="ts">
  import { page } from '$app/stores';

  import ProgramDetailContainer from '$container/ProgramDetailContainer.svelte';

  const id = $page.params.id;
</script>

<ProgramDetailContainer {id} />
