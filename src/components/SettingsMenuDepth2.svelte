<script lang="ts">
interface IDepth2 {
  title: string
  link: string
  desc: string
  handler: () => void
  linkHandler: () => void
}
export let depth2: IDepth2;
</script>

<li class="depth2-menu" on:click={depth2.handler}>
  <span class="depth2-title">{depth2.title}</span>
  {#if depth2.desc || depth2.link}
    <span 
      class:link={depth2.link}
      class="depth2-desc"
      on:click={depth2.linkHandler}
    >{depth2.desc || depth2.link}</span>
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
  .depth2-desc {
    color: $disabled-8a;
    &.link {
      text-decoration: underline;
    }
  }
}
</style>