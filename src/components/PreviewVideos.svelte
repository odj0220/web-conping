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
  import { createEventDispatcher } from 'svelte';
  import PreviewVideo from './PreviewVideo.svelte';
  import { onMount } from 'svelte';

  export let title: string;
  export let contents: any[];
  export let onClick: () => void;
  export let infiniteScroll = false;
  export let autoPlay = true;

  let infiniteScrollArea: HTMLElement | null = null;
  let infiniteScrollConfig: {done: boolean;} | null = null;
  let scrollTimer: any = null;

  const dispatch = createEventDispatcher<{'request-more': {request: true}}>();

  onMount(() => {
    console.log(contents);
    initialInfiniteScroll();
  });

  function initialInfiniteScroll() {
    if (!infiniteScroll) {
      return;
    }

    infiniteScrollConfig = {
      done: false,
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
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
        request: true,
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
          {#each contents as content, order (content.id)}
<!--            <PreviewVideo content={content} order={order + 1} {onClick} {autoPlay}/>-->
            <PreviewVideo content={content} order={order + 1} autoPlay={autoPlay}/>
          {/each}
    </ul>

    {#if infiniteScroll}
      <section class="infinite-scroll" bind:this={infiniteScrollArea}></section>
      {#if $scrolling}
        <div class="spinner-wrapper">
          <div class="spinner"></div>
        </div>
      {/if}
    {/if}
</section>

<!--<section class="videos-wrapper">-->
<!--  {#if title}-->
<!--    <h2 class="title">-->
<!--      {title}-->
<!--    </h2>-->
<!--  {/if}-->

<!--  <ul class="contents-container">-->
<!--    {#each contents as content, order (content.id)}-->
<!--      <PreviewVideo content={content} order={order + 1} {onClick} {autoPlay}/>-->
<!--    {/each}-->
<!--  </ul>-->

<!--  {#if infiniteScroll}-->
<!--    <section class="infinite-scroll" bind:this={infiniteScrollArea}></section>-->
<!--    {#if $scrolling}-->
<!--      <div class="spinner-wrapper">-->
<!--        <div class="spinner"></div>-->
<!--      </div>-->
<!--    {/if}-->
<!--  {/if}-->
<!--</section>-->

<style lang="scss">
  @import '../styles/variables.scss';

  .videos-wrapper {
    .title {
      @include body3-700;
      margin-bottom: 1.2rem;
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
