<script lang="ts">
import { graphqlApi } from '$lib/_api_graphql';

import { onMount } from 'svelte';

import ProgramList from './ProgramList.svelte';

let programs: any[] = [];

onMount(() => {
  getData();
});

const getData = async () => {
  const query = '{programs{id name bannerImg}}';
  const result = await graphqlApi(query);
  programs = result?.data?.programs;
  console.log('result', result);
};
</script>

<section class="section">
    <h3 class="title">골라라 오리지널</h3>
    <ProgramList data={programs}/>
</section>

<style lang="scss">
    @import "../styles/variables.scss";

    .section {
        .title {
            @include body1-700; 
            padding-left: 1.6rem;
            margin-bottom: 12px;     
        }
    }
    
</style>