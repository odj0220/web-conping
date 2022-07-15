<script lang="ts">
export let depth2: string;
export let onClick = (category: string) => void;

</script>

<li class="depth2-menu" on:click={() => onClick(depth2)}>
  {depth2}
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