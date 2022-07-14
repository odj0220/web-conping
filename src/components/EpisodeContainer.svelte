<script lang=ts>
  import { onMount } from 'svelte';
  
  import { graphqlApi } from '../lib/_api_graphql';
  import { goto } from '$app/navigation';
  
  import type { Content } from 'src/global/types';

  import ImageListView from './ImageListView.svelte';

  export let id: string;
  let contents: Content[];

  onMount(async () => {
    const query = `{
      getContentsByProgramId(id:"${id}", type:EPISODE){
        id
        name
        videoId
        thumb
        program{
          name
        }
      }
    }`;

    const result = await graphqlApi(query);

    console.log(result);

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
