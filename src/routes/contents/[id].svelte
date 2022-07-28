<script lang="ts">
  import { page } from '$app/stores';

  import ContentsDetailContainer from '$container/ContentsDetailContainer.svelte';
  import { onMount } from 'svelte';

  $: id = $page.params.id;

  onMount(() => {
    console.log(window.history.length);
    setTimeout(() => {
      console.log('historyback');
      window.history.back();
    }, 1000);

  });
</script>

{#key id}
  <ContentsDetailContainer id={id} />
{/key}
