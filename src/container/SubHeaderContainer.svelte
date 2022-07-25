<script lang="ts">
  import { goBack } from '$lib/utils/goto';

  import SubHeader from '$component/SubHeader.svelte';

  export let title = '';
  export let share = false;
  export let type = '';

  let y = 0;

  function handleClickButton(type: string) {
    switch (type) {
    case 'back':
      goBack();
      break;
    case 'share':
      break;
    default:
      break;
    }
  }
</script>

<svelte:window bind:scrollY={y} />

{#key y}
  <SubHeader {title} {share} onClick={handleClickButton} {type} color={y > 0 ? true : false}/>
{/key}
