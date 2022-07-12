<script lang="ts">
import { fly } from 'svelte/transition';

import { pannable } from '../util/pannable';

export let visible = false;

let min = 0;
let max = 100;
let pos = 50;
let wall;

function clamp(min: number, max: number, value: number) {
  if (min > value) {
    return min;
  }

  if (max < value) {
    return max;
  }

  return value;
}

function fixLimits() {
  if (min > max) {
    [min, max] = [max, min];
  }

  max = clamp(0, 100, max);
  min = clamp(0, 100, min);
  pos = clamp(min, max, pos);
}

function handlePanMove(event) {
  const { top, bottom, left, right } = wall.parentElement.getBoundingClientRect();

  const extents = [top, bottom];

  let px = clamp(
    extents[0],
    extents[1],
    event.detail.y,
  );

  pos = clamp(
    min,
    max,
    (100 * (px - extents[0])) / (extents[1] - extents[0]),
  );
}

$: fixLimits();
</script>

{#if visible}
  <div
    transition:fly="{{ y: 200, duration: 400 }}"
    bind:this={wall}
		class="wall"
		use:pannable
		on:panmove={handlePanMove}
		style="top: calc({pos}% - 8px)"
  >
    <slot name="title"/>
    <div>
      <slot />
    </div>
  </div>
{/if}

<style lang="scss">
  @import '../styles/modules.scss';
  @import '../styles/variables.scss';

	.wall {
    position: absolute;
		z-index: 10;
		padding: 4rem;
		background: #0A0A0A;
    width: 90%;
		height: 100%;
		border-radius: 8px;
		left: 50%;
		transform: translateX(-50%);
		box-shadow: 0 0 8px #4445;
    
    ::after {
      content: '';
      position: absolute;
      background-color: #FFFFFF;
      top: 1.6rem;
      left: 50%;
      transform: translateX(-50%);
      height: 0.4rem;
      width: 8rem;
      border-radius: 0.2rem;
    }
	}

</style>
