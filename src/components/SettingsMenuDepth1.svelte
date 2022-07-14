<script lang="ts">
interface IDepth2 {
  title: string
  link: string
  desc: string
  handler: () => void
}

interface IMenu {
  depth1: string
  depth2: IDepth2[]
}

import SettingsMenuDepth2 from './SettingsMenuDepth2.svelte';
export let menu: IMenu;
</script>

<li class="depth1">
  <span class="depth1-menu">{menu.depth1}</span>
  <ul class="depth2">
      {#each menu.depth2 as depth2}
        <SettingsMenuDepth2 {depth2}/>
      {/each}
  </ul>
</li>

<style lang="scss">
@import "../styles/variables.scss";
.depth1 {
  margin-bottom: 4rem;
  .depth1-menu {
    @include caption3;
    color: $disabled-8a;
    display: flex;
    align-items: flex-end;
    height: 4rem;
    background-color: $bg-black-21;
    padding: 0.8rem 1.6rem;
    box-sizing: border-box;
  }
}
</style>