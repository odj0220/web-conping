<script lang="ts" context="module">
  import { get, writable } from 'svelte/store';
  const scrolling = writable(false);
  
  export function startScrolling () {
    scrolling.set(true);
  }

  export function stopScrolling () {
    scrolling.set(false);
  }
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import PreviewVideo from './PreviewVideo.svelte';
  import { onMount } from 'svelte';

  export let title: string;
  export let contents!: {data: any[]; end: boolean; cursor: string};
  export let onClick: () => void;
  export let infiniteScroll = false;
  export let autoPlay = false;

  let infiniteScrollArea: HTMLElement | null = null;
  let scrollTimer: any = null;
  let io: any = null;

  $: videos = contents.data ? contents.data : [];

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
          if (!videos.length) {
            return;
          }

          if ($scrolling) {
            return;
          }

          if (contents.end) {
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
    {#if title}
      <h2 class="title">
        {title}
      </h2>
    {/if}

    <ul class="contents-container">
        {#if videos.length > 0}
            {#each videos as video, order (video.id)}
                <PreviewVideo content={video} order={order + 1} autoPlay={autoPlay}/>
            {/each}
        {/if}
    </ul>

    {#if infiniteScroll}
      <section class="infinite-scroll"
               class:done={contents.end}
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
  @import '../styles/variables.scss';

  .videos-wrapper {
    width: 100%;

    .title {
      @include body3-700;
      margin-bottom: 1.2rem;
    }

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
