<script type="ts">
  import { onMount } from 'svelte';

  import { guid } from '$lib/util';

  import YP from 'youtube-player';
  import type { YouTubePlayer } from 'youtube-player/dist/types';

  import Icon from './icons/Icon.svelte';

  export let videoId: string;
  export let thumbnail: string;
  export let width: number;
  export let height: number;
  export let playerVars;
  export let events;

  let clientWidth;
  let clientHeight;
  let displayLogo = true;
  let displayToast = true;
  let displayControls = false;
  let player: YouTubePlayer;
  let firstLoaded = false;
  let muted: boolean;
  let displayControlsDebounce : any;

  const playerId = guid();
  const defaultPlayerVars = {
    controls: 0, //플레이어 컨드롤러 표시여부
    rel: 0, //연관동영상 표시여부
    mute: 1,
    playsinline: 1, //ios환경에서 전체화면으로 재생하지 않게하는 옵션
    autoplay: 1, //자동재생 여부(모바일에서 작동하지 않습니다. mute설정을 하면 작동합니다.)
    loop: 1,
    playlist: videoId,
  };

  function hideLogo() {
    displayLogo = false;
    if (!firstLoaded) {
      player.playVideoAt(0);
    }
  }

  const toggleMuted = () => {
    if (muted) {
      player.unMute();
    } else {
      player.mute();
    }
  
    displayControls = true;
    muted = !muted;
  
    clearTimeout(displayControlsDebounce);
    displayControlsDebounce = setTimeout(() => {
      displayControls = false;
    }, 1500);
  };
  
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
    player.on('ready', () => {
      player.playVideo();
    });

    let displayLogDebounce;
    player.on('stateChange', event => {
      switch (event.data) {
      // 영상 중지
      case -1:
        displayLogo = true;
        break;
        // playing
      case 1:
        displayLogDebounce = setTimeout(() => {
          hideLogo();
          firstLoaded = true;
        }, firstLoaded ? 100 : 3200);
        break;
      case 2:
        if (displayLogDebounce) {
          window.clearTimeout(displayLogDebounce);
        }
        displayLogo = true;
        break;
      case 3:
        setTimeout(() => {
          firstLoaded = true;
        }, 4000);
        break;
      default:
      }
    });

    setTimeout(() => {
      displayToast = false;
    }, 1500);

    muted = player.isMuted();
  });
</script>

<div
  class="player-wrap"
  style="height: {clientHeight}px; width: {clientWidth}px" 
  on:click="{() => toggleMuted()}"
>
  <div id='{playerId}' class="youtube-player" allow="autoplay"></div>
  <div class="overlay-wrap">
    {#if player}
      <img
        class="thumb {displayLogo ? '' : 'hide'}"
        src={thumbnail}
        alt="thumbnail"
        />
        <!-- src="https://i.ytimg.com/vi/{videoId}/hqdefault.jpg" -->
    {/if}
  </div>
  
  <slot></slot>
  
  <span
    class="toast"
    class:on={displayToast}
  >
    화면 터치하여 음소거 해제
  </span>
  
  {#if displayControls}
    <span class="controls">
      <Icon name={muted ? 'mute' : 'voice'} /> 
    </span>  
  {/if}
</div>

<style lang="scss">
    .player-wrap {
      position: fixed;
      top: 0;
      display: block;
      overflow: hidden;

      .youtube-player {
        z-index: -1;
        top: 0;
        left: 0;
        position: absolute;
      }

      .overlay-wrap {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;

        .thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;

          &.hide {
            display: none;
          }
        }
      }
      .toast {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 3;
        padding: 0.6rem 1.2rem;
        background: rgba(80, 80, 80, 0.8);
        border-radius: 0.4rem;
        opacity: 0;
        visibility: hidden;
        transition: 0.3s;
        pointer-events: none;
        @include caption1-700;

        &.on {
          opacity: 1;
          visibility: visible;
        }
      }
      .controls {
        display: block;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 4;
      }
    }
</style>
