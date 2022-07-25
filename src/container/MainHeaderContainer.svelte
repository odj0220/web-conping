<script lang="ts">
  import { goto } from '$app/navigation';

  import Header from '$component/Header.svelte';

  export let title = '';
  
  const BUTTONS = ['cs'];

  function handleClickButton(type) {
    switch (type) {
    case 'cs':
      goto('/settings');
      break;

    default:
      break;
    }
  }
</script>

<Header onClick={handleClickButton} {title} buttons={BUTTONS}/>
