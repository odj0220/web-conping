<script lang="ts">
  import { graphqlApi } from '$lib/_api';

  import type { IPageInfo, IProduct, IProductEdge, ITabItem } from 'src/global/types';
  
  import { SORT_FIELDS } from '$lib/contants';

  import ShopNavbar from '$container/ShopNavbar.svelte';
  
  import Spinner from '$component/common/shared/Spinner.svelte';
  import LayoutPopup from '$component/common/layout/LayoutPopup.svelte';
  import Container from '$component/common/layout/Container.svelte';
  
  import InfiniteScroll from '$component/InfiniteScroll.svelte';
  
  import SelectPopup from '$component/SelectPopup.svelte';
  import ShopList from '$component/ShopList.svelte';

  let hasNextPage: boolean;
  let page = 1;
  let shopingProducts:IProduct[] = [];

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
  
  async function getProducts({ sort = 'alphabetical', category = 0, page = 1 } : {sort: string, category: number, page: number}) {
    const query = `{
      products (order: ${sort}, category: ${category}, page: ${page}) {
        totalCount
        pageInfo {
          page
          totalPage
          hasNextPage
        }
        edges {
          cursor
          node {
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
      }
    }`;

    const {
      data: {
        products,
      },
    } = await graphqlApi(query);

    return { products };
  }

  async function getTabItems() {
    const categories = await getCategories();

    const tabItems = setTabItems({ categories });

    return { tabItems };
  }

  async function getShopItems({ sort, category, page } : {sort: string, category: number, page: number}) {
    const {
      products: {
        edges,
        pageInfo,
      },
    } = await getProducts({ sort, category, page });

    setPageInfo(pageInfo);

    const shopItems = setShopItems({ products: edges, sort });

    shopingProducts = [
      ...shopingProducts,
      ...shopItems,
    ];
  }

  function setPageInfo(pageInfo: IPageInfo) {
    hasNextPage = pageInfo.hasNextPage;
    page = pageInfo.page;
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

  function setShopItems({ products, sort }: { products: IProductEdge[], sort: string }) {
    return products
      .map(({ node }) => node)
      .map((product, index) => {
        return {
          ...product,
          badge: getBadge({ sort, index }),
        };
      });
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

  function handleClickTab(clickedTab: ITabItem) {
    selectedTab = clickedTab;
  }
  
  function openPopup() {
    isPopupVisible = true;
  }
  
  function closePopup() {
    isPopupVisible = false;
  }
  
  function handleClickSelectButton(sortField: string) {
    sort = sortField;
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
  
    page++;
  }
  
  $:sortedName = SORT_FIELDS[sort];
  $:sortItems = setsortItems(SORT_FIELDS);
  $:category = selectedTab?.id || 0;
</script>

{#await getTabItems()}
  <Spinner />
{:then {tabItems}}
  <ShopNavbar
    {tabItems}
    {selectedTab}
    sort={sortedName}
    onClickTab={handleClickTab}
    onClickSort={openPopup}
  />
{/await}

{#await getShopItems({ sort, category, page })}
  <Spinner />
{:then}
  <Container>
    <InfiniteScroll
      end={!hasNextPage}
      on:request-more={runInfiniteScrolling}
    >
      <ShopList products={shopingProducts} />
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
