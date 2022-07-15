<script lang=ts>
  import { goto } from '$app/navigation';
  
  import { graphqlApi } from '../lib/_api';
  
  import type { IContent } from 'src/global/types';

  import PreviewVideos from './PreviewVideos.svelte';

  export let id: string;

  let contents: IContent[];
  let end = false;
  let cursor = '';

  const handleClickContents = (contentsId: string) => {
    goto(`/contents/${contentsId}`);
  };

  async function loadHighlight() {
    const query = `{
      getContentsByProgramId(id:"${id}", type:HIGHLIGHT){
        id
        title
        programId
        videoId
        thumb
        createDt
        episode
        program{
          id
          title
        }
      }
    }`;

    const result = await graphqlApi(query);

    contents = result.data.getContentsByProgramId;
  }
</script>

  <PreviewVideos
    {contents}
    {end}
    {cursor}
    onClickContents={handleClickContents}
  />
