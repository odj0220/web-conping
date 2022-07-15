<script lang="ts">
import { onMount } from 'svelte';
import { graphqlApi } from '$lib/_api';
import type { IProgram } from 'src/global/types';
import Title from './Title.svelte';
import ProgramList from './ProgramList.svelte';
import Container from './common/layout/Container.svelte';

let programs: IProgram[] = [];

function handleClickContents(id: string) {
  window.location.href = `/programs/${id}`;
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
  <Container marginTop="5.6rem" type="full">
    <Title title={[{ text: '골라라 오리지널' }]} marginLeft="1.6rem"/>
    <ProgramList
    {programs}
    type="horizontal"
    onClick={handleClickContents}
    />
  </Container>
{/if}
