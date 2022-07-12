<script lang="ts">
    import { onMount } from "svelte";
    
    export let height: number;
    export let maxHeight: number;
    
    interface BottomSheetMetrics {
      touchStart: {
        sheetY: number; // touchstart에서 BottomSheet의 최상단 모서리의 Y값
        touchY: number; // touchstart에서 터치 포인트의 Y값
      };
      touchMove: {
        prevTouchY?: number; // 다음 touchmove 이벤트 핸들러에서 필요한 터치 포인트 Y값을 저장
        movingDirection: "none" | "down" | "up"; // 유저가 터치를 움직이고 있는 방향 
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
          movingDirection: "none",
        },
        isContentAreaTouched: false,
      });
    
    let sheet;
    let handle;
    let offsetY;
    let MIN_Y = 60; // 바텀시트가 최대로 높이 올라갔을 때의 y 값
    let MAX_Y = 0; // 바텀시트가 최소로 내려갔을 때의 y 값
    let MIN_TOP;
    
    const handleTouchStart = (e: TouchEvent) => {
    };
    
    const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault();
        const {touchMove, touchStart} = metrics;
        const {clientY} = e.touches[0];
        
        if (touchMove.prevTouchY === undefined) {
            touchMove.prevTouchY = touchStart.touchY;
        }
    
        if (touchMove.prevTouchY < clientY) {
            touchMove.movingDirection = 'down';
        }
    
        if (touchMove.prevTouchY > clientY) {
            touchMove.movingDirection = 'up';
        }
    
        // 터치 시작점에서부터 현재 터치 포인트까지의 변화된 y값
        const touchOffset = clientY - touchStart.touchY;
        let nextSheetY = touchStart.sheetY + touchOffset;
        
        // nextSheetY 는 MIN_Y와 MAX_Y 사이의 값으로 clamp 되어야 한다
        if (nextSheetY <= MIN_Y) {
        }
        
        if (nextSheetY >= MAX_Y) {
            nextSheetY = MAX_Y;
        }
        // nextSheetY = touchOffset;
            
        // sheet 위치 갱신. 
        sheet.style.transition = 'none';
        sheet.style.setProperty('transform', `translateY(-${window.innerHeight - touchOffset}px)`);
        console.log("nextSheetY", nextSheetY)
        console.log("touchStart.sheetY", touchStart.sheetY)
        console.log("touchOffset", window.innerHeight ,window.innerHeight - touchOffset)
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
        const {touchMove:{ movingDirection}} = metrics;
        if(movingDirection === "down") {
            console.log("아래로")
        }
        if(movingDirection === "up") {
            console.log("위로")
        }
    
        sheet.style.transition = 'all 0.3s';
    };
    
    onMount(() => {
        handle.addEventListener('touchstart', handleTouchStart);
        handle.addEventListener('touchmove', handleTouchMove);
        handle.addEventListener('touchend', handleTouchEnd);
    })
    </script>
    
    <div bind:this={sheet} class="container" style="height: {height}px; bottom: {-offsetY}px">
    <div class="header" bind:this={handle}>
        <div class="handle"></div>
    </div>
    <div class="contents">
        <slot></slot>
    </div>
    </div>
    
    <style lang="scss">
        .container {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(10, 10, 10, 0.9);
            border-top-left-radius: 0.8rem;
            border-top-right-radius: 0.8rem;
            overflow: hidden;
            transition: all 0.3s;
            .header {
                padding: 1.6rem 0 0.4rem;
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
        }
    </style>