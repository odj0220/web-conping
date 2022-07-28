<script lang="ts">
  import { graphqlApi } from '$lib/_api';

  import type { IPageInfo, IProduct, IProductEdge, ITabItem } from 'src/global/types';

  import { SORT_FIELDS } from '$lib/contants';

  import ShopNavbar from '$container/ShopNavbar.svelte';

  import Spinner from '$component/common/shared/Spinner.svelte';
  import LayoutPopup from '$component/common/layout/LayoutPopup.svelte';
  import Container from '$component/common/layout/Container.svelte';
  import InfiniteScroll from '$component/common/layout/InfiniteScroll.svelte';

  import SelectPopup from '$component/SelectPopup.svelte';
  import ShopList from '$component/ShopList.svelte';

  let hasNextPage: boolean;
  let cursor = 0;
  let shopingProducts:IProduct[] = [];

  let tabItems: ITabItem[];
  let selectedTab: ITabItem;
  let sort = Object.keys(SORT_FIELDS)[0];
  let isPopupVisible = false;

  async function getCategories() {
    const query = `{
      categories(type: "PRODUCT") {
        id
        label: name
      }
    }`;

    const {
      data: {
        categories,
      },
    } = await graphqlApi(query);

    return categories;
  }

  async function getProducts({ sort = 'alphabetical', category = 0, cursor = 0 } : {sort: string, category: number, cursor: number}) {
    const query = `{
      getInfiniteProducts (order: ${sort}, category: ${category}, cursor: ${cursor}) {
        pageInfo {
          startCursor
          hasNextPage
        }
        products {
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
      }
    }`;

    const {
      data: {
        getInfiniteProducts: {
          products,
          pageInfo,
        },
      },
    } = await graphqlApi(query);
  
    return { products, pageInfo };
  }

  async function getTabItems() {
    const categories = await getCategories();

    tabItems = setTabItems({ categories });
  }

  async function getShopItems({ sort, category, cursor = 0 } : {sort: string, category: number, cursor?: number}) {
    const {
      products,
      pageInfo,
    } = await getProducts({ sort, category, cursor });

    setPageInfo(pageInfo);

    setShopingProducts({ products, sort });
  }

  function setPageInfo(pageInfo: IPageInfo) {
    hasNextPage = pageInfo.hasNextPage;
    cursor = +pageInfo.startCursor;
  }

  function setTabItems({ categories } : {categories : ITabItem[]}) {
    const defaultCategory = {
      id: 0,
      label: '전체',
      index: 0,
    };

    return [defaultCategory, ...categories]
      .map((category, index) => {
        return {
          ...category,
          index,
        };
      });
  }

  function setShopingProducts({ products, sort }: { products: IProduct[], sort: string }) {
    const shopItems = products
      .map((product, index) => {
        return {
          ...product,
          badge: getBadge({ sort, index }) as any,
        };
      });

    shopingProducts = [
      ...shopingProducts,
      ...shopItems,
    ];
  }

  function getBadge({ sort, index } : {sort: string, index: number}) {
    if (sort !== 'popularity') {
      return '';
    }

    const rank = index + 1;

    if (index < 3) {
      return {
        rank,
        iconTheme: 'Primary',
      };
    }

    if (index < 10) {
      return {
        rank,
        iconTheme: 'Secondary',
      };
    }

    return '';
  }


  function openPopup() {
    isPopupVisible = true;
  }

  function closePopup() {
    isPopupVisible = false;
  }

  function handleClickTab(clickedTabIndex: number) {
    selectedTab = tabItems[clickedTabIndex];
    shopingProducts = [];
  }

  function handleClickSelectButton(sortField: string) {
    shopingProducts = [];
    sort = sortField;
  }

  function handleClickProductItem(storeUrl) {
    console.log(storeUrl);
  }

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

  async function runInfiniteScrolling(event) {
    const detail = event.detail;

    detail.stop();

    if (!hasNextPage) {
      return;
    }

    // page++;
    getShopItems({ sort, category, cursor });
  }

  $:sortedName = SORT_FIELDS[sort];
  $:sortItems = setsortItems(SORT_FIELDS);
  $:category = selectedTab?.id || 0;
  $:infiniteScrollActive = !!shopingProducts?.length;
</script>

{#await getTabItems()}
  <Spinner />
{:then}
  {#if tabItems?.length }
    <ShopNavbar
      {tabItems}
      {selectedTab}
      sort={sortedName}
      onClickTab={handleClickTab}
      onClickSort={openPopup}
    />
  {/if}
{/await}

{#await getShopItems({ sort, category })}
  <Spinner />
{:then}
  <Container>
    <InfiniteScroll
      {infiniteScrollActive}
      end={!hasNextPage}
      on:request-more={runInfiniteScrolling}
    >
      <ShopList
        products={shopingProducts}
        onClickProductItem={handleClickProductItem}
      />
    </InfiniteScroll>
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
