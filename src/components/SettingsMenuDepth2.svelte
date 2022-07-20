<script lang="ts">
export let depth2: any;
export let onClick: (category: string) => void;

</script>

<li class="depth2-menu" on:click="{() => onClick(depth2.title)}">
  <span class="depth2-title">{depth2.title}</span>
  {#if depth2.descFn}
    <span class="depth2-desc">{depth2.descFn()}</span>
  {/if}
</li>

<style lang="scss">
@import "../styles/variables.scss";
.depth2-menu {
  @include body3-400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4.8rem;
  padding: 0 1.6rem;
  box-sizing: border-box;
  border-bottom: 1px solid $bg-black-21;
}
</style>