<script lang="ts">
import SettingsMenuDepth2 from './SettingsMenuDepth2.svelte';

export let menu: any;
export let onClick: (category: string) => void;
console.log('menu', menu);
</script>

<li class="depth1">
  <span class="depth1-menu">{menu.depth1}</span>
  <ul class="depth2">
      {#each menu.depth2 as depth2}
        <SettingsMenuDepth2 {depth2} {onClick}/>
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