<script lang="ts">
import { graphqlApi } from '$lib/_api';
import type { IProgram, TitleElement } from 'src/global/types';
import Title from './Title.svelte';
import ProgramList from './ProgramList.svelte';
import Container from './common/layout/Container.svelte';

function handleClickContents(id: string) {
  window.location.href = `/programs/${id}`;
}

const getData = async (): Promise<{programs: IProgram[]; title: TitleElement[]}> => {
  const query = `
    {
      getMainOrigin {
        title {
          text
          type
        }
        programs {
          id
          title
          thumbnail
        }
      }
    }
  `;

  const result = await graphqlApi(query);

  return result.data.getMainOrigin;
};
</script>

<Container margin="5.6rem 0 0 0" type="full">
{#await getData()}
{:then {programs, title}}
  <Title title={title} marginLeft="1.6rem"/>
  {#if programs?.length}
      <ProgramList
        {programs}
        type="horizontal"
        onClick={handleClickContents}
      />
  {/if}
{/await}
</Container>
