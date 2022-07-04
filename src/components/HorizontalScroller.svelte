<script lang="ts">
    import Device from 'svelte-device-info'
    import {SvelteComponent} from 'svelte';
    let horizontalScroller: SvelteComponent | null = null;
    let position = {scrollLeft: 0, clientX: 0};
    function removeStyleInMovingStart() {
        horizontalScroller.style.scrollBehavior = 'auto';
        horizontalScroller.style.cursor = 'grabbing';
        horizontalScroller.style.userSelect = 'none';
        horizontalScroller.style.scrollSnapType = 'none';
    }
    function restoreStyleInMovingEnd() {
        horizontalScroller.style.scrollSnapType = 'x mandatory';
        horizontalScroller.style.cursor = 'grab';
        horizontalScroller.style.removeProperty('user-select');
        horizontalScroller.style.scrollBehavior = 'smooth';
    }
    function touchDownHandler(event: TouchEvent) {
        position = {
            scrollLeft: horizontalScroller.scrollLeft,
            clientX: event.touches[0].clientX
        }
        removeStyleInMovingStart();
        document.addEventListener('touchmove', touchMoveHandler);
        document.addEventListener('touchend', touchEndHandler);
    }
    function touchEndHandler(_: TouchEvent) {
        document.removeEventListener('touchmove', touchMoveHandler);
        document.removeEventListener('touchend', touchEndHandler);
        restoreStyleInMovingEnd();
    }
    function touchMoveHandler(event: TouchEvent) {
        const diffClientX = event.touches[0].clientX - position.clientX;
        horizontalScroller.scrollLeft = position.scrollLeft - diffClientX;
    }
    function mouseDownHandler(event: MouseEvent) {
        if(Device.isMobile) {
            return;
        }
        position = {
            scrollLeft: horizontalScroller.scrollLeft,
            clientX: event.clientX
        }
        removeStyleInMovingStart();
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    }
    function mouseUpHandler(_: MouseEvent) {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
        restoreStyleInMovingEnd();
    }
    function mouseMoveHandler(event: MouseEvent) {
        const diffClientX = event.clientX - position.clientX;
        horizontalScroller.scrollLeft = position.scrollLeft - diffClientX;
    }
</script>

<section
        class="horizontal-scroller"
        on:mousedown={mouseDownHandler}
        on:touchstart={touchDownHandler}
        bind:this={horizontalScroller}
>
    <slot></slot>
</section>

<style lang="scss">
  .horizontal-scroller {
    width: 100%;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    overflow-x: auto;
    overflow-y: hidden;
    display: flex;
    & > :global(*) {
      flex-grow: 0;
      flex-shrink: 0;
    }
    &::-webkit-scrollbar {
      display: none !important;
    }
  }
</style>
