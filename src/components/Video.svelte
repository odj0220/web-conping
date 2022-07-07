<script lang="ts" context="module">
    let current;
    const observers = {
      map: new Map([]),
      add: function (key: string, value: {order: number; entry: any}) {
        if (!this.map.has(key)) {
          this.map.set(key, value);
          this.sort();
        }
      },
      remove: function(key: string) {
        this.map.delete(key);
      },
      sort: function() {
        const arrayFromMap = [...this.map];
        arrayFromMap.sort((entryA, entryB) => {
          const { order: orderA } = entryA[1];
          const { order: orderB } = entryB[1];

          if (orderA > orderB) {
            return 1;
          }
          if (orderA < orderB) {
            return -1;
          }
          return 0;
        });
        this.map = new Map(arrayFromMap);
      },
      playOnlyFirst: function() {
        const players = [...this.map].map(((player) => player[1]));

        for (let i = 0; i < players.length; i++) {
          const player = players[i];
    
          if (i === 0) {
            player.play();
            continue;
          }
    
          player.pause();
        }
      },
    };
</script>

<script type="ts">
  import { guid, toHHMMSS } from '$lib/util';
  export { toHHMMSS } from '$lib/util';
  import { onMount } from 'svelte';
  import YP from 'youtube-player';
  import type { YouTubePlayer } from 'youtube-player/dist/types';

  export let content: any;
  export let order = 0;
  export let onClick: () => void;

  let playTime;
  const playerId = guid();

  let player: YouTubePlayer;
  let videoElement: HTMLElement | null = null;
  let firstLoad = true;
  let pauseTimer: any = null;
  let interval: any = null;

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
      autoplay: 0, //자동재생 여부(모바일에서 작동하지 않습니다. mute설정을 하면 작동합니다.)
      loop: 0,
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
        if (entry.isIntersecting && entry.intersectionRatio === 1) {
          const value = {
            order,
            entry,
            play,
            pause,
          };
          observers.add(playerId, value);
          observers.playOnlyFirst();
        } else {
          pause();
          observers.remove(playerId);
          observers.playOnlyFirst();
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
      videoElement = target.i;
      player.playVideo();
      pause();
    });
  }

  function onPlayerStateChange() {
    player.on('stateChange', event => {
      const status = event.data;

      if (status === PLAYER_STATE.NOT_STARTED) {
        return;
      }

      if (status === PLAYER_STATE.PLAYING) {
        interval = setInterval(() => {
          playTime = player.getCurrentTime();
        }, 1000);
        return;
      }

      if (status === PLAYER_STATE.PAUSED) {
        clearTimeout(interval);
        return;
      }

      if (status === PLAYER_STATE.BUFFERING) {
        if (firstLoad) {
          setIntersectionObserver(videoElement);
          firstLoad = false;
        }
        return;
      }

      if (status === PLAYER_STATE.ENDED) {
        clearTimeout(interval);
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
  
    () => {
      observers.remove(playerId);
      clearTimeout(interval);
    };
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
<!-- 찰리님 태그 -->
<!--<li-->
<!--        class="item-card"-->
<!--        role="list"-->
<!--&gt;-->
<!--  <div class="image-wrapper">-->
<!--    <img-->
<!--            src={content.thumb} alt={content.name}-->
<!--            on:click={() => onClick(content.id)}-->
<!--    >-->
<!--  </div>-->
<!--  <div class="content-info-wrapper">-->
<!--    <div-->
<!--            class="info-title"-->
<!--            on:click={() => onClick(content.id)}-->
<!--    >-->
<!--      {(content.program.name).repeat(15)}-->
<!--      &lt;!&ndash; TODO: 테스트용 코드 수정 &ndash;&gt;-->
<!--    </div>-->
<!--    <div class="sub-info">-->
<!--      <img class="profile-icon" src={content.thumb} alt="방송로고">-->
<!--      <span class="profile-info">랜선뷰티 &middot; 5화 &middot; 2일 전</span>-->
<!--      &lt;!&ndash; TODO: 하드코딩 &ndash;&gt;-->
<!--    </div>-->
<!--  </div>-->
<!--</li>-->

<style lang="scss">
  @import '../styles/modules.scss';
  @import '../styles/variables.scss';

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


<!-- 찰리님 스타일 -->
<!--<style lang="scss">-->
<!--  @import '../styles/modules.scss';-->
<!--  @import '../styles/variables.scss';-->

<!--  .item-card {-->
<!--    display: flex;-->
<!--    flex-direction: column;-->
<!--    width: 100%;-->
<!--    border-radius: 0.4rem;-->
<!--    overflow: hidden;-->

<!--    .image-wrapper {-->
<!--      width: 100%;-->
<!--      height: 56.4%;-->
<!--      img {-->
<!--        width: 100%;-->
<!--        height: 100%;-->
<!--        object-fit: cover;-->

<!--        &:active {-->
<!--          transform: scale(1.01);-->
<!--          //TODO: 클릭할 때 효과 정의 필요-->
<!--        }-->
<!--      }-->

<!--      cursor: pointer;-->
<!--    }-->

<!--    .content-info-wrapper {-->
<!--      display: flex;-->
<!--      flex-direction: column;-->
<!--      gap: 0.8rem;-->
<!--      padding: 1.2rem;-->
<!--      background-color: $bg-black-21;-->

<!--      .info-title {-->
<!--        @include ellipsis(3);-->
<!--        @include caption1-400;-->

<!--        &:active {-->
<!--          transform: scale(1.01);-->
<!--          //TODO: 클릭할 때 효과 정의 필요-->
<!--        }-->
<!--      }-->

<!--      .sub-info {-->
<!--        display: flex;-->
<!--        flex-direction: row;-->
<!--        gap: 0.8rem;-->
<!--        align-items: center;-->

<!--        .profile-icon {-->
<!--          width: 2.4rem;-->
<!--          height: 2.4rem;-->
<!--          overflow: visible;-->
<!--          border-radius: 1.2rem;-->
<!--          object-fit: fill;-->
<!--        }-->
<!--        .profile-info {-->
<!--          @include caption2-400;-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->

<!--</style>-->
