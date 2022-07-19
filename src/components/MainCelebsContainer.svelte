<script lang="ts">
import { onMount } from 'svelte';

import { graphqlApi } from '../lib/_api';

import type { ICeleb } from 'src/global/types';

import Title from './Title.svelte';
import Celebs from './Celebs.svelte';
import MoreButton from './common/shared/MoreButton.svelte';

let celebs: ICeleb[] = [];

onMount(() => {
  getData();
});

const getData = async () => {
  const query = '{celebs{id name thumbnail categories}}';
  const result = await graphqlApi(query);
  celebs = result?.data?.celebs?.slice(0, 3);
};

const onClickMore = () => {
  console.log(
    '이동',
  );
};

const title = [
  {
    text: '지금 가장',
  },
  {
    text: '핫한',
    type: 'primary-20',
  },
  {
    text: '셀럽',
  },
];
</script>

<section class="section">
  <Title {title} />
  <Celebs {celebs}/>
  <MoreButton onClick={onClickMore} value="콘핑 셀럽 더보기"/>
</section>

<style lang="scss">
    .section {
      margin-top: 5.6rem;
      padding: 0 1.6rem;
      .title {
        @include body1-700;   
        margin-bottom: 12px;     
      }   
    }
</style>
