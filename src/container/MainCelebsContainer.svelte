<script lang="ts">
import { onMount } from 'svelte';

import { graphqlApi } from '../lib/_api';

import type { ICeleb } from 'src/global/types';

import Title from '$component/Title.svelte';
import Celebs from '$component/Celebs.svelte';
import MoreButton from '$component/common/shared/MoreButton.svelte';
import Container from '$component/common/layout/Container.svelte';


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

<Container>
  <Title {title} />
  <Celebs {celebs}/>
  <MoreButton onClick={onClickMore} value="콘핑 셀럽 더보기"/>
</Container>
