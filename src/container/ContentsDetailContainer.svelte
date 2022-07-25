<script lang="ts">
  import { graphqlApi } from '../lib/_api';

  import { goto } from '$app/navigation';

  import SubHeaderContainer from './SubHeaderContainer.svelte';
  import Player from '$component/Player.svelte';
  import Metadata from '$component/Metadata.svelte';
  import ContentDetailAnotherVideosContainer from '$component/ContentDetailAnotherVideosContainer.svelte';

  import type { YouTubePlayer } from 'youtube-player/dist/types';
  import type { IContent } from 'src/global/types';

  export let id: string;

  let player: YouTubePlayer | null = null;
  let content: IContent;
  let metaDataOption: any = {};

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
          ba_thumbnail
        }
      }
    `;

    const result = await graphqlApi(query);
    const celebs = result.data.getCelebsByContentId;
  
    content = result?.data?.content;
    metaDataOption = setMetadataOption(content, celebs);
  };
  
  const setMetadataOption = (content: any, celebs: any[]) => {
    const newData = {
      contentDetail: {
        title: content.title,
        celebs,
        info: {
          programId: content.program.id,
          programTitle: content.program.title,
          episode: content.episode,
          createDt: content.createDt,
        },
      },
    };

    return newData;
  };

  const setPlayer = (event: any) => {
    player = event.detail.player;
  };

  const onClickTitle = (id: string) => {
    goto(`/programs/${id}`);
  };
</script>


{#await getData()}
{:then data}
  <SubHeaderContainer title='{content?.program.title} {content?.episode}화' />
  <div class="container">
    <Player content={content} on:get-player={setPlayer}/>

    <Metadata option={metaDataOption} {onClickTitle}/>

    <ContentDetailAnotherVideosContainer contentId={id}/>
  </div>
{/await}
