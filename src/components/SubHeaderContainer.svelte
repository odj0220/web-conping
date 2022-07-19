<script lang="ts">
  import { navigate } from 'svelte-navigator';
  import SubHeader from './SubHeader.svelte';

  export let title = '';
  export let share = true;

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

  function goBack() {
    window.history.go(-1);
  }
</script>

<SubHeader {title} {share} onClick={handleClickButton}/>
