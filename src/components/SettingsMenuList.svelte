<script lang="ts">
import { onMount } from 'svelte';

import SettingMenuDepth1 from './SettingsMenuDepth1.svelte';

export let menuList: any[] = [];
export let appCheck: boolean;

let list: any[] = [];

onMount(() => {
  if (appCheck) {
    console.log('app');
  }
  console.log('web');
});

</script>

<ul class="menu-list">
  {#each list as menu}
    <SettingMenuDepth1 {menu}/>
  {/each}
</ul>