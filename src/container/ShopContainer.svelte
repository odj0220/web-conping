<script lang="ts">
  import { graphqlApi } from '$lib/_api';
  
  import { SORT_FIELDS } from '$lib/contants';

  import Container from '$component/common/layout/Container.svelte';
  import Spinner from '$component/common/shared/Spinner.svelte';
  import LayoutPopup from '$component/common/layout/LayoutPopup.svelte';
  
  import SelectPopup from '$component/SelectPopup.svelte';
  import ShopList from '$component/ShopList.svelte';
  import Sorter from '$component/Sorter.svelte';

  let sort = Object.keys(SORT_FIELDS)[0];
  let isPopupVisible = true;

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

    const {
      data: {
        products,
      },
    } = await graphqlApi(query);

    return products;
  };

  function openPopup() {
    isPopupVisible = true;
  }

  function closePopup() {
    isPopupVisible = false;
  }

  function handleClickSelectButton(sortField: string) {
    sort = sortField;
  }

  function setSelectItems(sortFieldsObject: { [index: string]: string }) {
    return Object
      .keys(sortFieldsObject)
      .map(item => {
        return {
          value: item,
          name: SORT_FIELDS[item],
        };
      });
  }

  $:selectItems = setSelectItems(SORT_FIELDS);
  $:sortedName = SORT_FIELDS[sort];
</script>

{#await getProducts(sort)}
  <Spinner /> 
{:then products}
  <Container >
    <Sorter
      sort={sortedName}
      onClick={openPopup}
    />
    <ShopList {products}/>
  </Container>
  
  <LayoutPopup visible={isPopupVisible}>
    <SelectPopup
      title='정렬 기준'
      onClickSelectButton={handleClickSelectButton}
      onClickCloseButton={closePopup}
      selected={sort}
      selectItems={selectItems}
    />
  </LayoutPopup>
{/await}
