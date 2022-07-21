<script lang="ts">
  import { fade } from 'svelte/transition';

  export let visible = false;
</script>

{#if visible}
  <div
    class="wall"
    out:fade
  >
    <slot />
  </div>
{/if}

<style lang="scss">
  .wall {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.66);
  }
</style>
