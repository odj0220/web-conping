<script lang="ts">
import SettingMenuDepth1 from './SettingsMenuDepth1.svelte';

export let list: any[] = [];
export let onClick: (category: string) => void;

</script>

<ul class="menu-list">
  {#each list as menu}
    <SettingMenuDepth1 {menu} {onClick}/>
  {/each}
</ul>