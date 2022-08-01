<script lang="ts">
  import { goBack } from '$lib/utils/goto';

  import SubHeader from '$component/SubHeader.svelte';

  export let title = '';
  export let share = true;
  export let type = '';
  export let onClickShare: () => void;

  let y = 0;

  function onClickBack() {
    goBack();
  }
</script>

<svelte:window bind:scrollY={y} />

{#key y}
  <SubHeader {title} {share} onClickBack={onClickBack} onClickShare={onClickShare} {type} color={y > 0 ? true : false}/>
{/key}
