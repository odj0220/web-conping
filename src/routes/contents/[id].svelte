<script lang="ts">
  import { page } from '$app/stores';

  import ContentsDetailContainer from '$container/ContentsDetailContainer.svelte';

  $: id = $page.params.id;
</script>
{#key id}
    <ContentsDetailContainer id={id} />
{/key}
