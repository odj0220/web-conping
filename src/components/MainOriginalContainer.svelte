<script lang="ts">
import { graphqlApi } from '$lib/_api';
import type { IProgram, TitleElement } from 'src/global/types';
import Title from './Title.svelte';
import ProgramList from './ProgramList.svelte';
import Container from './common/layout/Container.svelte';
import { gotoPrograms } from '$lib/util';

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

  const { data: { getMainOrigin } } = await graphqlApi(query);
  return getMainOrigin;
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
      onClick={gotoPrograms}
    />
  {/if}
{/await}
</Container>
