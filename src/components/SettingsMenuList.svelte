<script lang="ts">
import SettingMenuDepth1 from './SettingsMenuDepth1.svelte';

export let menuList: any[] = [];
</script>

<ul class="menu-list">
  {#each menuList as menu}
    <SettingMenuDepth1 {menu}/>
  {/each}
</ul>