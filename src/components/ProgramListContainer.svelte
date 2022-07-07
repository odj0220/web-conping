<script lang=ts>
import { graphqlApi } from '$lib/_api_graphql';
import { onMount } from 'svelte';
import Metadata from './Metadata.svelte';

export let id: string;

let data = {};

onMount(async () => {
  const query = `{program(id:"${id}"){id name description bannerImg}}`;
  const result = await graphqlApi(query);
  data = result?.data?.program; 
});

</script>

<div class="container">                             
  <div class="visual">
    <img src={data?.bannerImg} alt=""/>
  </div>
  <Metadata {...data}/>
</div>

<style lang="scss">
  

  .container {
    padding: 8px 16px 24px;
    .visual {
      border-radius: 4px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
  }
  
</style>