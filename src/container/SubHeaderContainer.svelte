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
  <div class={y > 0 ? 'color' : ''}>
    <SubHeader {title} {share} onClick={handleClickButton} {type} />
  </div>
{/key}

<style lang="scss">
  div {


    &.color {
    }
  }
</style>
