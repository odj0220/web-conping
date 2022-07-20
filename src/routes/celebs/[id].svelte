<script lang="ts">
  import { page } from '$app/stores';

  import CelebsDetailContainer from '$container/CelebsDetailContainer.svelte';

const id = $page.params.id;

</script>

<CelebsDetailContainer {id} />