<script lang="ts">
  import { fly, fade } from 'svelte/transition';


  export let visible = false;
  export let closePopup: () => void;
</script>

{#if visible}
  <div
    class="wall"
    on:click={closePopup}
    out:fade="{{ duration: 300 }}"
    in:fade="{{ duration: 300 }}"
  >
  <div transition:fly="{{ y: 200, duration: 300 }}">
    <slot />
  </div>
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
    background: rgba(0, 0, 0, 0.5);
  }
</style>
