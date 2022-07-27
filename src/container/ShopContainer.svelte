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

  //TODO: 카테고리 API로 변경
  const TAB_ITEMS = [
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

  let sort = Object.keys(SORT_FIELDS)[0];
  let isPopupVisible = false;

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

  /**
   * 정렬
   * @param sortFieldsObject
   */
  function setsortItems(sortFieldsObject: { [index: string]: string }) {
    return Object
      .keys(sortFieldsObject)
      .map(item => {
        return {
          value: item,
          name: SORT_FIELDS[item],
        };
      });
  }

  

  let selectedTab = TAB_ITEMS[0];

  function handleClickTab(index: number) {
    selectedTab = TAB_ITEMS[index];
  }
  
  
  $:sortItems = setsortItems(SORT_FIELDS);
  $:sortedName = SORT_FIELDS[sort];
  $:category = selectedTab.value;
  $:scrollToIndex = selectedTab.index * 50;
</script>

{#await getProducts(sort, category)}
  <Spinner /> 
{:then products}
  <ShopNavbar
    tabItems={TAB_ITEMS}
    {selectedTab}
    {scrollToIndex}
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
      selectItems={sortItems}
    />
  </LayoutPopup>
{/await}
