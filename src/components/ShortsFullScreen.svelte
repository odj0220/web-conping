<script type="ts">
    import { guid } from '$lib/util';
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

    let displayLogo = true;
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

    let player: YouTubePlayer;
    let firstLoaded = false;

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
    });

    function hideLogo() {
      displayLogo = false;
      if (!firstLoaded) {
        player.playVideoAt(0);
      }
    }
</script>
<div class="player-wrap" style="height: {clientHeight}px; width: {clientWidth}px">
    <div id='{playerId}' class="youtube-player" allow="autoplay"></div>
    <div class="overlay-wrap">
        {#if player}
            <img class="thumb {displayLogo ? '' : 'hide'}" src="https://i.ytimg.com/vi/{videoId}/hqdefault.jpg" alt="thumbnail"/>
        {/if}
    </div>
    <slot></slot>
</div>


<style lang="scss">
    .player-wrap {
      position: fixed;
      top: 0;
      display: block;
      overflow: hidden;

      .youtube-player {
        z-index: 1;
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
        z-index: 2;

        .thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;

          &.hide {
            display: none;
          }
        }
      }
    }
</style>
