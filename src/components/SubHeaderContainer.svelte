<script lang="ts">
  import { navigate } from 'svelte-navigator';

  import SubHeader from './SubHeader.svelte';

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

  export let title: string;
</script>

<SubHeader {title} onClick={handleClickButton}/>
