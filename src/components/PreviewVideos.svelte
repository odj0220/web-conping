<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import PreviewVideo from './PreviewVideo.svelte';

  export let title: string;
  export let contents: any[];
  export let onClick: () => void;
  export let infinite = false;
  export let autoPlay = true;
  export let scrolling!: boolean;

  const dispatch = createEventDispatcher<{'request-more': {request: true}}>();

  function setInfiniteScroll(node) {
    let io: IntersectionObserver | null = null;

    if (scrolling) {
      return;
    }
  
    if (infinite) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestInfiniteScroll();
          }
        }, { threshold: [0, 1] });
      });

      io.observe(node);
    }

    return {
      destroy() {
        if (io && io.unobserve) {
          io.unobserve(node);
        }
      },
    };
  }

  function requestInfiniteScroll() {
    dispatch('request-more', {
      request: true,
    });
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
      <PreviewVideo {content} order={order + 1} {onClick} {autoPlay}/>
    {/each}
  </ul>

  <section class="infinite-scroll" use:setInfiniteScroll></section>
  {#if scrolling}
    <div class="spinner-wrapper">
      <div class="spinner"></div>
    </div>
  {/if}
</section>

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
