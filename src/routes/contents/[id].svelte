<script lang="ts">
  import { page } from '$app/stores';
  import ContentsDetailContainer from '$container/ContentsDetailContainer.svelte';
  import { beforeNavigate } from '$app/navigation';

  const id = $page.params.id;

  beforeNavigate((navigation) => {
    const { to } = navigation;
    window.location.href = to.pathname;
  });
</script>

<ContentsDetailContainer {id} />
