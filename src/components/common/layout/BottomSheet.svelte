<script lang="ts">
import { onMount } from 'svelte';

// export let state: {offsetTop: number};
export let height: number;
export let offsetTop: number;
export let setOffsetTop: (num: number) => void;


interface BottomSheetMetrics {
  touchStart: {
    sheetY: number;
    touchY: number;
  };
  touchMove: {
    prevTouchY?: number;
    movingDirection: 'none' | 'down' | 'up';
  };
  isContentAreaTouched: boolean;
}

let metrics : BottomSheetMetrics = ({
  touchStart: {
    sheetY: 0,
    touchY: 0,
  },
  touchMove: {
    prevTouchY: 0,
    movingDirection: 'none',
  },
  isContentAreaTouched: false,
});

let sheet: HTMLDivElement;
let contents: HTMLDivElement;

onMount(() => {
  let MIN_Y = window.innerHeight - height;
  let MAX_Y = 0;

  const canUserMoveBottomSheet = () => {
    const { touchMove, isContentAreaTouched } = metrics;
    if (!isContentAreaTouched) {
      return true;
    }

    if (sheet.getBoundingClientRect().y !== MIN_Y) {
      return true;
    }

    if (touchMove.movingDirection === 'down') {
      return contents.scrollTop <= 0;
    }

    return false;
  };

  const handleTouchStart = (e: TouchEvent) => {
    const { touchStart, touchMove } = metrics;

    touchStart.sheetY = sheet.getBoundingClientRect().y;
    touchStart.touchY = e.touches[0].clientY;
    touchMove.prevTouchY = e.touches[0].clientY;
  };

  const handleTouchMove = (e: TouchEvent) => {
    const { touchMove, touchStart } = metrics;
    const { clientY } = e.touches[0];

    if (touchMove.prevTouchY === undefined) {
      touchMove.prevTouchY = touchStart.touchY;
    }

    if (touchMove.prevTouchY < clientY) {
      touchMove.movingDirection = 'down';
    }

    if (touchMove.prevTouchY > clientY) {
      touchMove.movingDirection = 'up';
    }

    if (canUserMoveBottomSheet()) {
      e.preventDefault();

      const touchOffset = clientY - touchStart.touchY;
      let nextSheetY = touchStart.sheetY + touchOffset;

      if (nextSheetY <= MIN_Y) {
        nextSheetY = MIN_Y;
      }

      if (nextSheetY >= MAX_Y) {
        nextSheetY = MAX_Y;
      }
    } else {
      document.body.style.overflowY = 'hidden';
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    document.body.style.overflowY = 'auto';
    const { touchMove: { movingDirection } } = metrics;
    if (canUserMoveBottomSheet()) {
      if (movingDirection === 'down') {
        setOffsetTop(0);
      }
      if (movingDirection === 'up') {
        setOffsetTop(560);
      }

    }
  };
  sheet.addEventListener('touchstart', handleTouchStart);
  sheet.addEventListener('touchmove', handleTouchMove);
  sheet.addEventListener('touchend', handleTouchEnd);
});

onMount(() => {
  const handleTouchStart = (e: TouchEvent) => {
    metrics.isContentAreaTouched = true;
  };

  contents.addEventListener('touchstart', handleTouchStart);
});


</script>

<div bind:this={sheet} class="container" style="height: {height}px; top: calc(100vh - {offsetTop}px);">
  <div class="header">
    <div class="handle"></div>
  </div>
  <div bind:this={contents} class="contents">
    <slot></slot>
  </div>
</div>

<style lang="scss">
    .container {
        position: fixed;
        top: 100vh;
        left: 0;
        right: 0;
        background-color: rgba(10, 10, 10, 0.9);
        border-top-left-radius: 0.8rem;
        border-top-right-radius: 0.8rem;
        overflow: hidden;
        transition: all 0.3s;
        .header {
            padding: 1.6rem 0 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            .handle {
                width: 8rem;
                height: 0.4rem;
                border-radius: 0.2rem;
                background-color: #fff;
            }
        }
        .contents {
          height: calc(100% - 4rem);
          overflow-y: scroll;
        }
    }
</style>