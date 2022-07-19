<script lang="ts">
import { graphqlApi } from '$lib/_api';
import { onMount } from 'svelte';
import type { ICeleb } from 'src/global/types';
import Celebs from './Celebs.svelte';
import Container from './common/layout/Container.svelte';
import MainHeaderContainer from './MainHeaderContainer.svelte';

onMount(() => {
  getData();
});

let celebs: ICeleb[] = [];

const getData = async () => {
  const query = '{celebs{id name thumbnail categories}}';
  const result = await graphqlApi(query);
  celebs = result?.data?.celebs?.slice(0, 3);
};


</script>

<MainHeaderContainer title="셀럽존" />
<Container marginTop="8px">
  <Celebs {celebs}/>
</Container>
