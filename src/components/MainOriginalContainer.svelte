<script lang="ts">
  import { onMount } from 'svelte';
  
  import { graphqlApi } from '$lib/_api_graphql';
  
  import { goto } from '$app/navigation';

  import type { Program } from 'src/global/types';
  
  import CenterSection from '$styles/CenterSection.svelte';
  import HorizontalScroller from './HorizontalScroller.svelte';
  
  import Title from './Title.svelte';
  import ProgramList from './ProgramList.svelte';

  let programs: Program[] = [];

  function handleClickContents(id: string) {
    goto(`/programs/${id}`);
  }

  const getData = async () => {
    const query = `
      {
        programs {
          id
          title
          thumbnail
        }
      }
    `;

    const result = await graphqlApi(query);

    programs = result?.data?.programs;
  };

  onMount(() => {
    getData();
  });

</script>

{#if programs?.length }
  <CenterSection type="inner transparency">
    <Title title={[{ text: '골라라 오리지널' }]} />
    
    <HorizontalScroller>
      <ProgramList
      {programs}
      type="horizontal"
      onClick={handleClickContents}
      />
    </HorizontalScroller>
  </CenterSection>
{/if}
