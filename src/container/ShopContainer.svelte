<script lang="ts">
  import { graphqlApi } from '$lib/_api';
  
  import { SORT_FIELDS } from '$lib/contants';

  import Container from '$component/common/layout/Container.svelte';
  import Spinner from '$component/common/shared/Spinner.svelte';
  import LayoutPopup from '$component/common/layout/LayoutPopup.svelte';
  
  import SelectPopup from '$component/SelectPopup.svelte';
  import ShopList from '$component/ShopList.svelte';
  import ShopNavbar from './ShopNavbar.svelte';

  import type { ITabItem } from 'src/global/types';

  let sort = Object.keys(SORT_FIELDS)[0];
  let isPopupVisible = false;
  let category: string;

  const getProducts = async (order = '', category = '') => {
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
      index: 0,
      value: 'all',
    },
    {
      label: '여성패션',
      index: 1,
      value: 'womenfashion',
    },
    {
      label: '화장품/미용',
      index: 2,
      value: 'cosmeticbeauty',
    },
    {
      label: '가구/인테리어',
      index: 3,
      value: 'interior',
    },
    {
      label: '출산',
      index: 4,
      value: 'angels',
    },
  ];

  function handleClickTab(selectedTab: ITabItem) {
    category = selectedTab.value ?? '';
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
