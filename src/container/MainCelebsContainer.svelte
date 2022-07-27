<script lang="ts">
import { graphqlApi } from '../lib/_api';

import type { ICeleb } from 'src/global/types';

import Title from '$component/Title.svelte';
import Celebs from '$component/Celebs.svelte';
import MoreButton from '$component/common/shared/MoreButton.svelte';
import Container from '$component/common/layout/Container.svelte';
import { goto } from '$app/navigation';
import MainCelebsSkeleton from '$component/skeleton/container/MainCelebsSkeleton.svelte';
import { gotoCelebs } from '$lib/utils/goto';

let celebs: ICeleb[] = [];

const getData = async () => {
  const query = '{celebs{id name thumbnail categories{id name}}}';
  const result = await graphqlApi(query);
  celebs = result?.data?.celebs?.slice(0, 3);
  return celebs;
};

const onClickMore = () => {
  goto('/celebs');
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

{#await getData()}
<MainCelebsSkeleton />
{:then celebs}
  <Container margin="5.6rem 0 0">
    <Title {title} />
    <Celebs {celebs} onClick={gotoCelebs}/>
    <MoreButton onClick={onClickMore} value="콘핑 셀럽 더보기" margin="1.6rem 0 0"/>
  </Container>
{/await}
