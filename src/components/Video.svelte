<script type="ts">
  import { guid, toHHMMSS } from '$lib/util';
  export { toHHMMSS } from '$lib/util';
  import { onMount } from 'svelte';
  import YP from 'youtube-player';
  import type { YouTubePlayer } from 'youtube-player/dist/types';

  export let content: any;
  export let onClick: () => void;

  let playTime;
  let displayLogo = true;
  const playerId = guid();

  let player: YouTubePlayer;
  let firstLoad = true;
  let displayLogDebounce;
  let pauseTimer: any = null;

  const PLAYER_STATE = {
    NOT_STARTED: -1,
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
  };

  function loadYoutubePlayer() {
    const playerVars = {
      controls: 0, //플레이어 컨드롤러 표시여부
      rel: 0, //연관동영상 표시여부
      mute: 1,
      playsinline: 1, //ios환경에서 전체화면으로 재생하지 않게하는 옵션
      autoplay: 1, //자동재생 여부(모바일에서 작동하지 않습니다. mute설정을 하면 작동합니다.)
      loop: 1,
      modestbranding: 1,
      disablekb: 1,
      enablejsapi: 1,
    };

    const option = {
      videoId: content.videoId,
      playerVars,
    };

    player = YP(playerId, option);
  }

  function setIntersectionObserver(element: HTMLElement) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          play();
        } else {
          // 최초 로딩시 검은화면을 방지하기 위해 1초뒤 일시정지
          pause();
        }
      });
    }, {
      threshold: 1,
    });
    io.observe(element);
  }

  function onPlayerReady() {
    player.on('ready', (event) => {
      const target = event.target;
      const element = target.i;
  
      setIntersectionObserver(element);
    });
  }

  function onPlayerStateChange() {
    player.on('stateChange', event => {
      const status = event.data;

      if (status === PLAYER_STATE.NOT_STARTED) {
        if (firstLoad) {
          firstLoad = false;
        }
        return;
      }

      if (status === PLAYER_STATE.PLAYING) {
        console.log('시작');
        /*
        * 시작할때 로고를 가려야한다.
        * */
        // displayLogDebounce = setTimeout(() => {
        //   displayLogo = false;
        //   firstLoad = false;
        // }, firstLoad ? 3200 : 100);
        return;
      }

      if (status === PLAYER_STATE.PAUSED) {
        console.log('일시정지');
        if (displayLogDebounce) {
          // window.clearTimeout(displayLogDebounce);
        }
        displayLogo = true;
        return;
      }

      if (status === PLAYER_STATE.BUFFERING) {
        console.log('버퍼');
        // setTimeout(() => {
        //   firstLoad = false;
        // }, 4000);
        return;
      }
    });
  }

  function pause() {
    clearTimeout(pauseTimer);
    pauseTimer = setTimeout(() => {
      player.pauseVideo();
    }, 1000);
  }

  function play() {
    player.playVideo();
  }

  onMount(async () => {
    loadYoutubePlayer();
    onPlayerReady();
    onPlayerStateChange();

    setInterval(() => {
      playTime = player.getCurrentTime();
    }, 1000);
  });
</script>
<div class="player-wrap" on:click={onClick}>
    <div id='{playerId}' class="youtube-player"></div>
    <div class="overlay-wrap">
        {#if player}
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
</div>


<style>
    .player-wrap {
        display: inline-block;
        width: 100%;
        height: auto;
        padding-top: 56.25%;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .player-wrap .youtube-player {
        z-index: 1;
        top: 0;
        left: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        pointer-events: none;
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

    @media (max-width: 495px) {
        .player-wrap .running-time {
            width: 85px;
            height: 20px;
            font-size: 12px;
        }
    }
</style>
