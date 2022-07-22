<script lang="ts">
  import { graphqlApi } from '$lib/_api';
  
  import { SORT_FIELDS } from '$lib/contants';

  import Container from '$component/common/layout/Container.svelte';
  import Spinner from '$component/common/shared/Spinner.svelte';
  import LayoutPopup from '$component/common/layout/LayoutPopup.svelte';
  
  import SelectPopup from '$component/SelectPopup.svelte';
  import ShopList from '$component/ShopList.svelte';
  import ShopNavbar from './ShopNavbar.svelte';

  let sort = Object.keys(SORT_FIELDS)[0];
  let isPopupVisible = false;
  let category: string;

  const getProducts = async (order = '', category = '') => {
    //TODO: category 수정
  
    const parameter = `
      order:${order}
    `;

    const query = `{
      products(${parameter}) {
        id
        name
        brand
        image
        price
        relatedItems {
          thumbnail
          title
          type
          id
        }
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

  let tabItems = [
    {
      label: '전체',
      value: 'all',
      index: 0,
    },
    {
      label: '여성패션',
      value: 'womenfashion',
      index: 1,
    },
    {
      label: '화장품/미용',
      value: 'cosmeticbeauty',
      index: 2,
    },
    {
      label: '가구/인테리어',
      value: 'interior',
      index: 3,
    },
    {
      label: '출산',
      value: 'angels',
      index: 4,
    },
  ];

  function handleClickTab(selectedTab: string) {
    category = selectedTab;
  }

  $:selectItems = setSelectItems(SORT_FIELDS);
  $:sortedName = SORT_FIELDS[sort];
</script>

{#await getProducts(sort)}
  <Spinner /> 
{:then products}
  <ShopNavbar
    items={tabItems}
    onClickTab={handleClickTab}
    sort={sortedName}
    onClickSort={openPopup}
  />
  <Container >
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
