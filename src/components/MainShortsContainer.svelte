<script lang="ts">
  import { onMount } from 'svelte';
  import { graphqlApi } from '$lib/_api_graphql';
  import type { Content, TitleElement } from 'src/global/types';

  import CenterSection from '$styles/CenterSection.svelte';
  import Hscroller from './HorizontalScroller.svelte';

  import Title from './Title.svelte';
  import ShortVodList from './ShortVodList.svelte';
import Container from './common/layout/Container.svelte';

  let contents: Content[];
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
  <Container type="full" marginTop="5.6rem">
    <Title {title} marginLeft="1.6rem" marginBottom="1.6rem"/>
    
    <Hscroller>
      <ShortVodList
        {contents}
        onClick={handleClickShorts}
      />
    </Hscroller>
  </Container>
{/if}
