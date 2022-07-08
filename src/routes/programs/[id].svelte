<script>
  import { page } from '$app/stores';
  
  import ProgramListContainer from '$component/ProgramListContainer.svelte';

  const id = $page.params.id;
</script>

<ProgramListContainer {id} />
