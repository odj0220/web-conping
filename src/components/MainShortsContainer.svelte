<script lang="ts">
  import { onMount } from 'svelte';
  import { graphqlApi } from '$lib/_api';
  import type { IContent, TitleElement } from 'src/global/types';

  import CenterSection from '$styles/CenterSection.svelte';
  import Hscroller from './HorizontalScroller.svelte';

  import Title from './Title.svelte';
  import ShortVodList from './ShortVodList.svelte';
import Container from './common/layout/Container.svelte';

  let contents: IContent[];
  let title: TitleElement[];

  onMount(async () => {
    getShorts();
  });

  function handleClickShorts(id:string) {
    window.location.href = `/shorts/${id}`;
  }

  async function getShorts() {
    const query = `{
      getMainShorts{
        title {
          text
          type
        } 
        contents {
          id
          thumb
          title
        }
      }
    }`;
  
    const result = await graphqlApi(query);

    title = result?.data?.getMainShorts?.title;
    contents = result?.data?.getMainShorts?.contents;
  }
</script>

{#if contents?.length }
  <Container type="full" margin="5.6rem 0 0 0">
    <Title {title} marginLeft="1.6rem" marginBottom="1.6rem"/>
    
    <ShortVodList
      {contents}
      onClick={handleClickShorts}
    />
  </Container>
{/if}
