<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte';
    import { guid } from '$lib/util';
    import YP from 'youtube-player';
    import { getContinueWatchingList, setContents } from '../lib/_continue_watching';

    export let content: any;
    let player;
    let continueInterval;
    let continueIntervalTime = 10000;

    const playerId = guid();
    const dispatch = createEventDispatcher<{'get-player': {player: any}}>();

    onMount(async () => {
      await loadYoutubePlayer();
      await onPlayerReady();
      onPlayerStateChange();
    });


    const loadYoutubePlayer = async () => {
      const playerVars = {
        controls: 1, //플레이어 컨드롤러 표시여부
        rel: 0, //연관동영상 표시여부
        loop: 1,
        mute: 0,
      };
    
      const option: any = {
        videoId: content.videoId,
        playerVars,
      };

      player = await YP(playerId, option);
      emitPlayer(player);
    };

    const emitPlayer = (player) => {
      dispatch('get-player', {
        player,
      });
    };

    const onPlayerReady = () => {
      player.on('ready', async (event) => {
        const continueItem = await (await getContinueWatchingList() || []).find(contentItem => contentItem.id === content.id);
        const continueCurrentTime = continueItem ? continueItem.currentTime : 0;
        setCurrentTime(continueCurrentTime);
      });
    };

    const setCurrentTime = (num: number) => {
      player.seekTo(num, true);
    };

    const onPlayerStateChange = () => {
      const PLAYER_STATE = {
        NOT_STARTED: -1,
        ENDED: 0,
        PLAYING: 1,
        PAUSED: 2,
        BUFFERING: 3,
      };

      player.on('stateChange', event => {
        const status = event.data;

        if (status === PLAYER_STATE.PLAYING) {
          setContinueWatching();
          return;
        }

        if (status === PLAYER_STATE.PAUSED) {
          clearInterval(continueInterval);
          return;
        }

        if (status === PLAYER_STATE.ENDED) {
          clearInterval(continueInterval);
          return;
        }
      });
    };

    const setContinueWatching = () => {
      clearInterval(continueInterval);

      setContinueTime();

      continueInterval = setInterval(() => {
        setContinueTime();
      }, continueIntervalTime);
    };

    const setContinueTime = () => {
      player.getCurrentTime().then(async currentTime => {
        await setContents({
          ...content,
          currentTime,
        });
      });
    };
</script>

<div class="player-wrap">
    <div id='{playerId}' class="youtube-player"></div>
</div>

<style lang="scss">
.player-wrap {
    width: 100%;
    height: auto;
    position: relative;
    padding-top: 56.25%;
    overflow: hidden;
    position: sticky;
    top: 5.4rem;
    z-index: 49;

    .youtube-player {
        z-index: 1;
        top: 0;
        left: 0;
        position: absolute;
        width: 100%;
        height: 100%;
    }
}
</style>
