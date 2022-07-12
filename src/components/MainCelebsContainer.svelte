<script lang="ts">
import { graphqlApi } from '$lib/_api_graphql';
import { onMount } from 'svelte';

import Celebs from './Celebs.svelte';
import MoreButton from './common/shared/MoreButton.svelte';

let celebs: any[] = [];


onMount(() => {
  getData();
});

const getData = async () => {
  const query = '{celebs{id name thumbnail}}';
  const result = await graphqlApi(query);
  celebs = result?.data?.celebs?.slice(0, 3);
  console.log('celebs', celebs);
};

const onClickMore = () => {
  console.log(
    '이동',
  );
};

</script>

<section class="section">
    <h4 class="title">
        지금 가장 핫한 셀럽
    </h4>
    <Celebs data={celebs}/>
    <MoreButton onClick={onClickMore} value="골라라 셀럽 더보기"/>
</section>

<style lang="scss">
    @import "../styles/variables.scss";

    .section {
      margin-top: 5.6rem;
        padding: 0 1.6rem;
        .title {
            @include body1-700;   
            margin-bottom: 12px;     
        }   
    }
    
</style>