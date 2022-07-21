<script type="ts">
import { onMount } from 'svelte';
import YP from 'youtube-player';
import type { YouTubePlayer } from 'youtube-player/dist/types';
import Icon from './icons/Icon.svelte';
import { fade } from 'svelte/transition';

export let videoId: string;
export let width: number;
export let height: number;
export let playerVars;

let displayToast = true;
let player: YouTubePlayer;
let muted = true;
let displayControls = false;
let displayControlsDebounce : any;

const defaultPlayerVars = {
  controls: 0, //플레이어 컨드롤러 표시여부
  rel: 0, //연관동영상 표시여부
  mute: 1,
  playsinline: 1, //ios환경에서 전체화면으로 재생하지 않게하는 옵션
  autoplay: 1, //자동재생 여부(모바일에서 작동하지 않습니다. mute설정을 하면 작동합니다.)
  loop: 1,
  playlist: videoId,
};

const toggleMuted = () => {
  displayControls = true;
  if (muted) {
    player.unMute();
  } else {
    player.mute();
  }
  muted = !muted;

  clearTimeout(displayControlsDebounce);
  displayControlsDebounce = setTimeout(() => {
    displayControls = false;
  }, 1500);
};

onMount(async () => {
  const option = {
    ...(videoId && { videoId }),
    ...(playerVars ? { playerVars } : { playerVars: defaultPlayerVars }),
  };

  player = YP(videoId, option);
  player.on('ready', () => {
    player.playVideo();
  });

  setTimeout(() => {
    displayToast = false;
  }, 1500);
});

</script>

<div
  class="player-wrap"
  on:click={toggleMuted}
>
  <div id={videoId} class="youtube-player" allow="autoplay"></div>
  <slot></slot>
  
  {#if displayToast}
    <span
      class="toast"
      transition:fade
    >
      화면 터치하여 음소거 해제
    </span>
  {/if}
  
  {#if displayControls}
    {#if muted}
      <span class="controls" transition:fade>
        <Icon name="mute" />   
      </span>
    {:else}
      <span class="controls" transition:fade>
        <Icon name="voice" />   
      </span>
    {/if}
  {/if}
</div>

<style lang="scss">
    .player-wrap {
      position: fixed;
      top: 0;
      display: block;
      overflow: hidden;
      width: 100%;
      height: 100%;
      z-index: 10;
      .youtube-player {
        z-index: 10;
        height: 100%;
        width: 100%;
        pointer-events: none;
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
        // opacity: 0;
        // visibility: hidden;
        // transition: 0.3s;
        pointer-events: none;
        @include caption1-700;
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
