<script>
import { graphqlApi } from '$lib/_api_graphql';
import CenterSection from '$styles/CenterSection.svelte';
import { onMount } from 'svelte';
import Celebs from './Celebs.svelte';
import Header from './Header.svelte';

onMount(() => {
  getData();
});

const buttons = ['setting'];
let celebs;

const getData = async () => {
  const query = '{celebs{id name thumbnail categories}}';
  const result = await graphqlApi(query);
  celebs = result?.data?.celebs?.slice(0, 3);
  console.log('celebs', celebs);
};


</script>

<Header title="셀럽존" buttons={buttons}/>
<CenterSection type="transparency">
  <Celebs {celebs}/>
</CenterSection>