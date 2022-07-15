<script lang="ts">
import { onMount } from 'svelte';
import SettingMenuDepth1 from './SettingsMenuDepth1.svelte';

export let menuList: any[] = [];
export let appCheck: boolean;
export let onClick: (category: string) => void;

let list: any[] = [];

onMount(() => {
  if (appCheck) {
    list = menuList;
  }
  list = menuList.filter(el => el.depth1 === '고객센터');
});

</script>

<ul class="menu-list">
  {#each list as menu}
    <SettingMenuDepth1 {menu} {onClick}/>
  {/each}
</ul>