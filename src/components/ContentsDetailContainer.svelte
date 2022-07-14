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
  import ContentDetailAnotherVideosContainer from './ContentDetailAnotherVideosContainer.svelte';

  const playerId = guid();

  export let id: string;
  
  let player: YouTubePlayer;
  let content: any;
  let continueInterval;
  let continueIntervalTime = 10000;
  let metaDataOption: any = {};

  onMount(async () => {
    await getData();
    await loadYoutubePlayer();
  });

  const getData = async () => {
    const query = `
      {
        content(id:"${id}"){
          id
          title
          createDt
          description
          programId
          episode
          thumb
          videoId
          duration
          currentTime
          program {
            id
            title
          }
        }

        getCelebsByContentId(id: "${id}") {
          id
          name
          description
          categories
          banner
          thumbnail
        }
      }
    `;

    const result = await graphqlApi(query);
    const celobs = result.data.getCelebsByContentId;
    content = result?.data?.content;
    metaDataOption = setMetadataOption(content, celobs);
  };

  const setMetadataOption = (content: any, celebs: any[]) => {
    const newData = {
      contentDetail: {
        title: content.title,
        celebs,
        info: {
          programTitle: content.program.title,
          episode: content.episode,
          createDt: content.createDt,
        },
      },
    };
  
    return newData;
  };

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
    onPlayerStateChange();
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

  <Metadata option={metaDataOption}/>

  <RelatedProductContainer
          {id}
          onClickTimeButton={setCurrentTime}
          timelineButtonVisible={true}
  />

  <ContentDetailAnotherVideosContainer contentId={id}/>
</div>
