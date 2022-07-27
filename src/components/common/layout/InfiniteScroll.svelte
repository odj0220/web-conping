<script lang="ts" context="module">
  import { writable } from 'svelte/store';
  const scrolling = writable(false);

  export function startScrolling () {
    scrolling.set(true);
  }

  export function stopScrolling () {
    scrolling.set(false);
  }
</script>

<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  import Spinner from '$component/common/shared/Spinner.svelte';

  export let end: boolean;

  let infiniteScrollArea: HTMLElement | null = null;
  let scrollTimer: any = null;
  let io: any = null;

  const dispatch = createEventDispatcher<{'request-more': {stop:() => void}}>();

  onMount(() => {
    initialInfiniteScroll();

    return () => {
      if (io && infiniteScrollArea) {
        io.unobserve(infiniteScrollArea);
      }
    };
  });

  function initialInfiniteScroll() {
    io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if ($scrolling) {
            return;
          }

          if (end) {
            return;
          }

          startScrolling();
          requestInfiniteScroll();
        }
      }, { threshold: [0, 1] });
    });

    io.observe(infiniteScrollArea);
  }

  function requestInfiniteScroll() {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      dispatch('request-more', {
        stop: stopScrolling,
      });
    }, 1000);
  }

</script>

<ul>
  <slot />

  <section
    class="infinite-scroll"
    class:done={end}
    bind:this={infiniteScrollArea}
  />
  {#if $scrolling}
    <Spinner />
  {/if}
</ul>

<style>
  .infinite-scroll {
    padding-bottom: 2rem;
  }
</style>