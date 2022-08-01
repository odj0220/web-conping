<script lang="ts">
  import { page } from '$app/stores';

  import CelebsDetailContainer from '$container/CelebsDetailContainer.svelte';

  let id = $page.params.id;
</script>

{#key id}
    <CelebsDetailContainer {id} />
{/key}
