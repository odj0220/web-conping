<script lang="ts">
import { goto } from '$app/navigation';

import Header from './Header.svelte';

function handleClickButton(type: string) {
  switch (type) {
  case 'setting':
    goto('/settings');
    break;

  default:
    break;
  }
}

const BUTTONS = ['setting'];
</script>

<Header onClick={handleClickButton} buttons={BUTTONS}/>
