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

  import Celeb from './Celeb.svelte';

  import type { ICeleb } from 'src/global/types';

  export let celebs: ICeleb[] = [];
  export let onClick : (id: string) => void;
  export let end: boolean;
  export let cursor: string;
  export let infiniteScroll = false;

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
    if (!infiniteScroll) {
      return;
    }

    io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!celebs?.length) {
            return;
          }

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

<ul class="celebs">
  {#each celebs as celeb}
    <Celeb {celeb} onClick={onClick} />
  {/each}

  {#if infiniteScroll}
  <section class="infinite-scroll"
           class:done={end}
           bind:this={infiniteScrollArea}
  ></section>
  {#if $scrolling}
    <div class="spinner-wrapper">
      <div class="spinner"></div>
    </div>
  {/if}
{/if}
</ul>

<style lang="scss">
  .infinite-scroll {
      padding-bottom: 2rem;
    }
  .spinner-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    .spinner {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 50%;
      border: 0.4rem solid transparent;
      border-top-color: #ee2554;
      border-left-color: #ee2554;
      animation: spinner 1s ease infinite;
    }

    @keyframes spinner {
      from {transform: rotate(0deg); }
      to {transform: rotate(360deg);}
    }
  }
</style>
