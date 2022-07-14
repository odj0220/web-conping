<script lang="ts">
  import { navigate } from 'svelte-navigator';
  import SubHeader from './SubHeader.svelte';

  export let title = '';
  export let share = true;

  function handleClickButton(type: string) {
    switch (type) {
    case 'back':
      navigate(-1);
      break;

    case 'share':
      console.log('TODO: 공유하기');
      break;

    default:
      break;
    }
  }
</script>

<SubHeader {title} {share} onClick={handleClickButton}/>
