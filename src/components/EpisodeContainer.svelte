<script lang=ts>
  import { onMount } from 'svelte';
  
  import { graphqlApi } from '../lib/_api';
  import { goto } from '$app/navigation';
  
  import type { IContent } from 'src/global/types';

  import ImageListView from './ImageListView.svelte';

  export let id: string;
  let contents: IContent[];

  onMount(async () => {
    const query = `{
      getContentsByProgramId(id:"${id}", type:FULL){
        id
        title
        videoId
        thumb
        program{
          title
        }
      }
    }`;

    const result = await graphqlApi(query);

    contents = result.data.getContentsByProgramId;
  });

  const handleClickContents = (contentsId: string) => {
    goto(`/contents/${contentsId}`);
  };
</script>

<ImageListView
  {contents}
  onClick={handleClickContents}
/>
