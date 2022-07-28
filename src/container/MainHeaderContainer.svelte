<script lang="ts">
  import Header from '$component/Header.svelte';
  import { onSettingTap } from '../lib/_app_communication';

  export let title = '';
  
  const BUTTONS = ['cs'];

  function handleClickButton(type) {
    switch (type) {
    case 'cs':
      onSettingTap();
      break;

    default:
      break;
    }
  }
</script>

<Header onClick={handleClickButton} {title} buttons={BUTTONS}/>
