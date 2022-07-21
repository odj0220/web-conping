<script lang="ts">
  import { goBack } from '$lib/utils/goto';
  
  import SubHeader from '$component/SubHeader.svelte';

  export let title = '';
  export let share = false;
  export let type = '';

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

<SubHeader {title} {share} onClick={handleClickButton} {type} />
