<script type="ts">
    import { guid, toHHMMSS } from '$lib/util';
    export { toHHMMSS } from '$lib/util';
    import { onMount } from 'svelte';
    import YP from 'youtube-player';
    import type { YouTubePlayer } from 'youtube-player/dist/types';

    export let videoId: string;
    export let width: number;
    export let height: number;
    export let playerVars;
    export let events;

    let clientWidth;
    let clientHeight;


    let playTime;
    let displayLogo = true;
    const playerId = guid();
    const defaultPlayerVars = {
      controls: 0, //플레이어 컨드롤러 표시여부
      rel: 0, //연관동영상 표시여부
      mute: 1,
      playsinline: 1, //ios환경에서 전체화면으로 재생하지 않게하는 옵션
      autoplay: 1, //자동재생 여부(모바일에서 작동하지 않습니다. mute설정을 하면 작동합니다.)
      loop: 1,
      modestbranding: 1,
    };

    let player: YouTubePlayer;

    onMount(async () => {
      clientWidth = screen.width;
      clientHeight = screen.height;
      height = screen.height;
      width = screen.width;

    
      const option = {
        ...(videoId && { videoId }),
        ...(width && { width }),
        ...(height && { height }),
        ...(playerVars ? { playerVars } : { playerVars: defaultPlayerVars }),
        ...(events && { events }),
      };

      player = YP(playerId, option);
      player.on('ready', (event) => {
        const target: any = event.target;
        const element = target.i;

        // player.playVideo();
        const io = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              player.playVideo();
            } else {
              // 최초 로딩시 검은화면을 방지하기 위해 1초뒤 일시정지
              setTimeout(() => {
                player.pauseVideo();
              }, 1000);
            }
          });
        }, {
          threshold: 1,
        });
        io.observe(element);

      });

      let displayLogDebounce;
      let firstLoad = true;
      player.on('stateChange', event => {
        // playing
        if (event.data === 1) {
          displayLogDebounce = setTimeout(() => {
            displayLogo = false;
            firstLoad = false;
          }, firstLoad ? 3200 : 100);
        }
        // paused
        if (event.data === 2) {
          if (displayLogDebounce) {
            window.clearTimeout(displayLogDebounce);
          }
          displayLogo = true;
        }

        // buffer
        if (event.data === 3) {
          setTimeout(() => {
            firstLoad = false;
          }, 4000);
        }
      });

      setInterval(() => {
        playTime = player.getCurrentTime();
      }, 1000);
    });
</script>
<div class="player-wrap" style="height: {clientHeight}px; width: {clientWidth}px">
    <div id='{playerId}' class="youtube-player"></div>
    <div class="overlay-wrap">
        {#if player}
            <div class="logo overlay {displayLogo ? '' : 'hide'}"></div>
            <div class="running-time overlay">
                {#await playTime}
                    ...waiting
                {:then number}
                    {toHHMMSS(number)}
                {:catch error}
                    {error.message}
                {/await}
            </div>
        {/if}
    </div>
    <div class="over">
        sdfjlkasfjdklsafjaskl
    </div>
</div>


<style>
    .player-wrap {
        position: fixed;
        top: 0;
        display: block;
        overflow: hidden;
    }
    .player-wrap .youtube-player {
        z-index: 1;
        top: 0;
        left: 0;
        position: absolute;
    }

    .player-wrap .overlay {
        position: absolute;
    }

    .player-wrap .overlay-wrap {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
    }

    .player-wrap .logo {
        top: 0;
        left: 0;
        width: 100%;
        height: 60px;
        background: #000;
        background-size: cover;
        z-index: 3;
    }

    .player-wrap .hide {
        opacity: 0;
        transition: opacity 0.3s;
    }

    .player-wrap .running-time {
        bottom: 15px;
        right: 16px;
        z-index: 3;
        display: flex;
        width: 110px;
        height: 26px;
        background: #323232;
        border-radius: 5px;
        color: #fff;
        align-items: center;
        justify-content: center;
        font-family: system-ui;
    }

    .over {
        width: 200px;
        height: 200px;
        background: red;
        position: fixed;
        top: 10px;
        z-index: 2;
        opacity: .2;
    }
    
    @media (max-width: 495px) {
        .player-wrap .running-time {
            width: 85px;
            height: 20px;
            font-size: 12px;
        }
    }
</style>
