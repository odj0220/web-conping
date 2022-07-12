<script lang="ts">
  import { onMount } from 'svelte';

  import { guid } from '$lib/util';
  import { graphqlApi } from '$lib/_api_graphql';
  import { setContents, getList } from '$lib/_continue_watching';

  import YP from 'youtube-player';

  import type { YouTubePlayer } from 'youtube-player/dist/types';
  
  import Metadata from './Metadata.svelte';
  import Player from './Player.svelte';
  import RelatedProductContainer from './RelatedProductContainer.svelte';

  const playerId = guid();

  export let id: string;
  
  let player: YouTubePlayer;
  let content: any;
  let continueInterval;
  let continueIntervalTime = 10000;

  const loadYoutubePlayer = async () => {
    const playerVars = {
      controls: 1, //플레이어 컨드롤러 표시여부
      rel: 0, //연관동영상 표시여부
      loop: 0,
    };

    const option: any = {
      videoId: content.videoId,
      playerVars,
    };

    player = await YP(playerId, option);
  
    const continueItem = (await getList() || []).find(contentItem => contentItem.id === content.id);
  
    const continueCurrentTime = continueItem ? continueItem.currentTime : 0;
  
    setCurrentTime(continueCurrentTime);
  };


  const getData = async () => {
    const query = `
      {
        content(id:"${id}"){
          id 
          contentType 
          createDt 
          description 
          program { 
            id 
            name
          } 
          programId 
          round 
          thumb 
          videoId 
          duration 
          currentTime
        }
      }
    `;
  
    const result = await graphqlApi(query);
  
    content = result?.data?.content;
  };

  onMount(async () => {
    await getData();

    await loadYoutubePlayer();
  
    onPlayerStateChange();
  });

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
      console.log(event);

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

  const setCurrentTime = (num: number) => {
    player.seekTo(num, true);
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

<div class="container">
  <Player
    {player}
    {playerId}
  />

  <Metadata
    title="MZ세대의 트렌드 Y2K, 트렌드에 맞는 핵심 메이크업 비결을 알아보자!!??"
    airingBeginAt={1655045914850}
    airingEndAt={1655045914850}
  />
  
  <RelatedProductContainer
    {id}
    onClickTimeButton={setCurrentTime}
    timelineButtonVisible={true}
  />
</div>
