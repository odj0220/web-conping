<script lang="ts">
  import { graphqlApi } from '$lib/_api';

  import type { IProduct } from 'src/global/types';
  
  import Container from './common/layout/Container.svelte';
  import Dimmend from './common/layout/Dimmend.svelte';
  import Spinner from './common/shared/Spinner.svelte';
  
  import MainHeaderContainer from './MainHeaderContainer.svelte';
  import Sorter from './Sorter.svelte';
  import ShopList from './ShopList.svelte';
  
  let products: IProduct[] = [];
  let list: IProduct[] = [];
  let sort = 'latest';

  const getProducts = async (sortField: string) => {
    console.log('//TODO: sort .. ', sortField);
  
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

  function handleSorterClick() {
    console.log('click');
  }

  const sorter = [
    {
      name: '인기순',
      handler: sortHandler,
    },
  ];
</script>

{#await getProducts(sort)}
  <Spinner /> 
{:then products}
  <MainHeaderContainer title="쇼핑존" />
  <Container >
    <Sorter {sort} onClick={handleSorterClick} />
    <ShopList {products}/>
  </Container>
  <Dimmend />
{/await}
