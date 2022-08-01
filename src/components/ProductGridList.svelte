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
  import ProductGridItem from './ProductGridItem.svelte';

  import type { IProduct } from 'src/global/types';
  import { createEventDispatcher, onMount } from 'svelte';
  import { openBrowser } from '../lib/util';

  export let data:IProduct[] = [];
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
          if (!data?.length) {
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

  function goProduct(event) {
    const url = event.detail.targetUrl;
    openBrowser(url);
  }
</script>

<ul class="product-grid-list">
  {#each data as item}
    <ProductGridItem data={item} on:go-link={goProduct}/>
  {/each}
</ul>

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

<style lang="scss">
  .product-grid-list {
    width: 100%;
    display: grid;
    flex-wrap: wrap;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    row-gap: 1.6rem;
    column-gap: 1.6rem;
    padding-bottom: 1.6rem;
  }

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
