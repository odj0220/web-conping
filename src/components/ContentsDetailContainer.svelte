<script lang="ts">
  import { guid } from '$lib/util';

  import { onMount } from 'svelte';

  import YP from 'youtube-player';
  
  import type { YouTubePlayer } from 'youtube-player/dist/types';

  import Player from './Player.svelte';
  import Metadata from './Metadata.svelte';
  import RelatedProductContainer from './RelatedProductContainer.svelte';

  export let id: string;

  let player: YouTubePlayer;

  const playerId = guid();

  const loadYoutubePlayer = () => {
    const playerVars = {
      controls: 1, //플레이어 컨드롤러 표시여부
      rel: 0, //연관동영상 표시여부
      mute: 1,
      playsinline: 1, //ios환경에서 전체화면으로 재생하지 않게하는 옵션
      autoplay: 1, //자동재생 여부(모바일에서 작동하지 않습니다. mute설정을 하면 작동합니다.)
      loop: 0,
      modestbranding: 1,
      disablekb: 1,
      enablejsapi: 1,
    };

    const option: any = {
      videoId: 'pb3bt3MBHk0',
      playerVars,
    };

    player = YP(playerId, option);
  };

  onMount(async () => {
    loadYoutubePlayer();
  });

  const setCurrentTime = (num: number) => {
    player.seekTo(num, true);
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
