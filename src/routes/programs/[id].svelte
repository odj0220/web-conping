<script>
  import { page } from '$app/stores';
  
  import ProgramListContainer from '$component/ProgramListContainer.svelte';

  const id = $page.params.id;
</script>

<!-- <HeaderContainer /> TODO: 헤더 -->


<ProgramListContainer {id} />
