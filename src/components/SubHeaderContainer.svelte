<script lang="ts">
  import { navigate } from 'svelte-navigator';
  import SubHeader from './SubHeader.svelte';

  export let title = '';
  export let share = false;

  function handleClickButton(type: string) {
    switch (type) {
    case 'back':
      window.history.go(-1);
      break;
    case 'share':
      break;
    default:
      break;
    }
  }
</script>

<SubHeader {title} {share} onClick={handleClickButton}/>
