<script lang="ts">
import { graphqlApi } from '$lib/_api_graphql';
import { onMount } from 'svelte';
import MainHeaderContainer from './MainHeaderContainer.svelte';
import ShopList from './ShopList.svelte';
import type { IProduct } from 'src/global/types';
import Sorter from './Sorter.svelte';
import Container from './common/layout/Container.svelte';
import Dimmend from './common/layout/Dimmend.svelte';

let products: IProduct[] = [];
let list: IProduct[] = [];

onMount(() => {
  getData();
});

const getData = async () => {
  const query = '{products{id name price image brand}}';
  const result = await graphqlApi(query);
  products = result?.data?.products;
  list = result?.data?.products;
};

const sortHandler = (sort: string) => {
  console.log('sort', sort);
  switch (sort) {
  case '인기순': list = products;
  }
};

let sort = '인기순';
const sorter = [
  {
    name: '인기순',
    handler: sortHandler,
  },
];
</script>

<MainHeaderContainer title="쇼핑존" />
<Container marginTop="0px">
  <Sorter {sorter} {sort}/>
  <ShopList {list}/>
</Container>
<Dimmend />
