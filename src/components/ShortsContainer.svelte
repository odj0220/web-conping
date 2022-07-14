<script lang=ts>
  import { onMount } from 'svelte';
  
  import { graphqlApi } from '../lib/_api_graphql';
  
  import { goto } from '$app/navigation';
  
  import type { Content } from 'src/global/types';

  import ShortsGridVodList from './ShortsGridVodList.svelte';

  export let id: string;
  let contents:Content[];

  const handleClickShorts = (id: string) => {
    goto(`/contents/${id}`);
  };

  onMount(async () => {
    const query = `{
      getContentsByProgramId(id:"${id}", type:SHORTS){
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
</script>
  
<ShortsGridVodList
  {contents}
  onClick={handleClickShorts}
/>
