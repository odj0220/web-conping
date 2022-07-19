<script lang="ts">
  import { navigate } from 'svelte-navigator';
  import SubHeader from './SubHeader.svelte';

  export let title = '';
  export let share = true;

  function handleClickButton(type: string) {
    switch (type) {
    case 'back':
      window.history.back();
      setTimeout(() => {
        window.location.href = document.referrer;
      }, 0);
      break;
    case 'share':
      break;
    default:
      break;
    }
  }
</script>

<SubHeader {title} {share} onClick={handleClickButton}/>
