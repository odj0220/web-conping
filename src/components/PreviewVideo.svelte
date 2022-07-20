<script lang="ts" context="module">
  import type { YouTubePlayer } from 'youtube-player/dist/types';
  const observers = {
    map: new Map([]),
    add: function (key: string, value: {order: number; player: YouTubePlayer}) {
      if (!this.map.has(key)) {
        this.map.set(key, value);
        this.sort();
      }
    },
    remove: function(key: string) {
      const removedElement = this.map.get(key);
  
      if (removedElement && removedElement.player) {
        removedElement.player.pauseVideo();
      }
  
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
      const players = [...this.map].map(((player) => player[1].player));

      for (let i = 0; i < players.length; i++) {
        const player = players[i];

        if (i === 0) {
          player.playVideo();
          continue;
        }

        player.pauseVideo();
      }
    },
  };
</script>

<script type="ts">
  import { guid, toHHMMSS } from '$lib/util';
  import { onMount, SvelteComponent } from 'svelte';
  import YP from 'youtube-player';
  import Avatar from './Avatar.svelte';
  import type { IContent } from 'src/global/types';

  export let content: IContent;
  export let order = 0;
  export let onClick: (id: string) => void;
  export let autoPlay: boolean;

  const playerId = guid();
  let playTime;
  let player: YouTubePlayer;
  let container: HTMLElement | null = null;
  let videoElement: HTMLElement | null = null;
  let thumbnailElement: HTMLElement | null = null;
  let pauseTimer: any = null;
  let interval: any = null;
  let PastTimeDelta: SvelteComponent;

  const PLAYER_STATE = {
    NOT_STARTED: -1,
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
  };

  $: videoName = content.title;
  $: programName = content.program?.title;
  $: programThumbnail = content.program?.thumbnail;
  $: episode = `${content.episode && `${content.episode}화`}`;
  $: createdAt = content.createDt;
  $: views = content.views ? `조회수 ${content.views}회` : '';

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

    const option: any = {
      videoId: content.videoId,
      playerVars,
    };

    player = YP(playerId, option);
  }

  function setIntersectionObserver(element: HTMLElement) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio === 1) {
          const value: any = {
            order,
            player,
          };
          observers.add(playerId, value);
          observers.playOnlyFirst();
        } else {
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
      if (autoPlay) {
        setIntersectionObserver(container);
      }
    });
  }

  function onPlayerStateChange() {
    player.on('stateChange', event => {
      const status = event.data;

      if (status === PLAYER_STATE.NOT_STARTED) {
        return;
      }

      if (status === PLAYER_STATE.PLAYING) {
        hideThumbnail();
        clearInterval(interval);
        interval = setInterval(() => {
          playTime = player.getCurrentTime();
        }, 1000);
        return;
      }

      if (status === PLAYER_STATE.PAUSED) {
        showThumbnail();
        clearInterval(interval);
        return;
      }

      if (status === PLAYER_STATE.BUFFERING) {
        return;
      }

      if (status === PLAYER_STATE.ENDED) {
        hideThumbnail();
        clearInterval(interval);
        player.seekTo(0, true);
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

  function showThumbnail() {
    thumbnailElement.style.display = 'block';
  }

  function hideThumbnail() {
    thumbnailElement.style.display = 'none';
  }

  onMount(async () => {
    const module = await import('./PastTimeDelta.svelte');
    PastTimeDelta = module.default;

    loadYoutubePlayer();
    onPlayerReady();
    onPlayerStateChange();

    () => {
      observers.remove(playerId);
      clearInterval(interval);
    };
  });
  console.log('onclick', onclick);
</script>

<li class="preview-layout" bind:this ={container} on:click="{() => onClick(`${content.id}`)}">
  <section class="player-wrap">
    <div id='{playerId}' class="youtube-player"></div>
    <section class="thumb-wrap" bind:this={thumbnailElement}>
      <img src={content.thumb} alt={content.title + '의 썸네일'}>
    </section>
    <div class="overlay-wrap">
      {#if player}
        <div class="running-time overlay" class:hide={!autoPlay}>
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
  </section>

  <section class="data-wrap">
    <div class="title-wrapper">
  <span class="title">
        {videoName}
  </span>
    </div>
    <div class="rest">
      <Avatar size="24px" src={programThumbnail} alt={programName} />
      <div class="info">
        <span class="program-name">{programName}</span>
        <span class="episode">{episode}</span>
        {#if views}
          <span class="divider">・</span>
          <span class="views">{views}</span>
        {/if}
        <span class="divider">・</span>
        <svelte:component this={PastTimeDelta} pastTime={createdAt}></svelte:component>
      </div>
    </div>
  </section>
</li>

<style lang="scss">
.preview-layout {
  /* 유튜브 플레이어 영역 */
  border-radius: 0.4rem;
  overflow: hidden;
  position: relative;
  width: 100%;
  .player-wrap {
  width: 100%;
  height: auto;
  padding-bottom: 56.25%;
  position: relative;

  .thumb-wrap {
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;
    overflow: hidden;
    z-index: 2;
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .youtube-player {
    z-index: 1;
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .overlay {
    position: absolute;
  }

  .overlay-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }

  .hide {
    opacity: 0;
    transition: opacity 0.3s;
  }

  .running-time {
    @include caption3;
    bottom: 1rem;
    right: 0.8rem;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 0.2rem;
    color: #fff;
    font-family: system-ui;
    padding: 0.2rem 0.6rem;

    &.hide {
      display: none !important;
    }
  }
}

.data-wrap {
  flex: 1;
  padding: 1.2rem;
  background-color: #212121;

  .title-wrapper {
    @include ellipsis(2);
    margin-bottom: 0.8rem;
    .title {
      @include caption1-400;
    }
  }

  .rest {
    @include caption2-400;
    display: flex;
    align-items: center;
    .info {
      margin-left: 0.8rem;
    }
  }
}
}

</style>
