<script lang="ts">
  import { fly } from 'svelte/transition';

  export let visible = false;
</script>

{#if visible}
  <div
    transition:fly="{{ y: 200, duration: 400 }}"
  >
    <slot />
  </div>
{/if}

<style lang="scss">
	.wall {
    position: absolute;
		z-index: 10;
		padding: 2.4rem;
		background: #323232;
    width: 100%;
		height: 30rem;
		border-radius: 0.8rem;
	}
</style>
