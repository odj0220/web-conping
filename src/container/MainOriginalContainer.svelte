<script lang="ts">
  import { graphqlApi } from '$lib/_api';

  import type { IProgram, TitleElement } from 'src/global/types';

  import { gotoPrograms } from '$lib/util';

  import ProgramList from '$component/ProgramList.svelte';
  import Title from '$component/Title.svelte';
  import Container from '$component/common/layout/Container.svelte';

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
