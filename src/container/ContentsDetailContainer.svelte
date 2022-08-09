<script lang="ts">
  import { graphqlApi } from '../lib/_api';

  import { gotoPrograms } from '$lib/utils/goto';
  import { callShare } from '../lib/_app_communication';

  import SubHeaderContainer from './SubHeaderContainer.svelte';
  import Player from '$component/Player.svelte';
  import Metadata from '$component/Metadata.svelte';
  import ContentDetailAnotherVideosContainer from '$component/ContentDetailAnotherVideosContainer.svelte';
  import Container from '$component/common/layout/Container.svelte';

  import type { YouTubePlayer } from 'youtube-player/dist/types';
  import RelatedProductContainer from './RelatedProductContainer.svelte';

  export let id: number;

  let player: YouTubePlayer | null = null;

  const getData = async () => {
    const query = `
      {
        content(id:"${id}"){
          id
          title
          createDt
          description
          contentType
          program {
            id
            title
          }
          programId
          episode
          thumb
          videoId
          duration
          currentTime
        }

        getCelebsByContentId(id: "${id}") {
          id
          name
          description
          categories {
            id
            name
            fontColor
            backColor
          }
          thumbnail
          banner
        }
      }
    `;

    const { data: { content, getCelebsByContentId: celebs } } = await graphqlApi(query);

    return { content, celebs };
  };

  const setPlayer = (event: any) => {
    player = event.detail.player;
  };

  const setCurrentTimeInPlayer = (event) => {
    const currentTime = event.detail.currentTime;
    if (player) {
      player.seekTo(currentTime, true);
    }
  };

  const onClickShare = () => {
    callShare('contents', id.toString());
  };
</script>


{#await getData()}
{:then {content, celebs}}
  <SubHeaderContainer title='{content?.program.title} {content?.episode ? content?.episode + "화" : ""}' onClickShare={onClickShare}/>

  <Container type="full" margin="0">
    <Player content={content} on:get-player={setPlayer}/>

    <Metadata {content} {celebs} onClickTitle={gotoPrograms}/>

    <RelatedProductContainer {id} timelineButtonVisible={true} on:set-video-current-time={setCurrentTimeInPlayer}></RelatedProductContainer>
    <ContentDetailAnotherVideosContainer contentId={id}/>
  </Container>
{/await}
