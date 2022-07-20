<script lang="ts">
  import { onMount } from 'svelte';

  import { graphqlApi } from '$lib/_api';

  import type { IProduct } from 'src/global/types';
  
  import Container from './common/layout/Container.svelte';
  import Dimmend from './common/layout/Dimmend.svelte';
  
  import MainHeaderContainer from './MainHeaderContainer.svelte';
  import ShopList from './ShopList.svelte';
  import Sorter from './Sorter.svelte';
import Spinner from './common/shared/Spinner.svelte';
  
  let products: IProduct[] = [];
  let list: IProduct[] = [];

  onMount(() => {
    getProducts();
  });

  const getProducts = async () => {
    const query = `{
      products {
        id
        name
        price
        image
        brand
      }
    }`;

    const { data: { products } } = await graphqlApi(query);
  
    return products;
  };

  const sortHandler = (sort: string) => {
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

{#await getProducts()}
  <Spinner /> 
{:then contents}
  <MainHeaderContainer title="쇼핑존" />
  <Container marginTop="0px">
    <Sorter {sorter} {sort}/>
    <ShopList {list}/>
  </Container>
  <Dimmend />
{/await}
