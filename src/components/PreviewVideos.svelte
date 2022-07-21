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
  import PreviewVideo from './PreviewVideo.svelte';
  import type { IContent } from 'src/global/types';

  export let contents: IContent[] = [];
  export let end: boolean;
  export let cursor: string;
  export let onClick: (id: string) => void;
  export let infiniteScroll = false;
  export let autoPlay = false;

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
          if (!contents?.length) {
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

<section class="videos-wrapper">
  <ul class="contents-container">
    {#if contents?.length > 0}
      {#each contents as content, order (content.id)}
        <PreviewVideo
          onClick={onClick}
          content={content}
          order={order + 1}
          autoPlay={autoPlay}
        />
      {/each}
    {/if}

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
</section>

<style lang="scss">
  .videos-wrapper {
    width: 100%;

    .infinite-scroll {
      padding-bottom: 2rem;
    }
    
    .contents-container {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      gap: 2rem;
      justify-content: space-between;
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
  }
  
</style>
