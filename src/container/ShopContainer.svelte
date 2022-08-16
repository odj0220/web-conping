<script lang="ts">
  import { graphqlApi } from '$lib/_api';

  import { gotoCelebs, gotoContents } from '$lib/utils/goto';
  import { openBrowser } from '$lib/util';

  import type { IPageInfo, IProduct, ITabItem } from 'src/global/types';

  import { SORT_FIELDS } from '$lib/contants';

  import LayoutPopup from '$component/common/layout/LayoutPopup.svelte';
  import Container from '$component/common/layout/Container.svelte';
  import InfiniteScroll from '$component/common/layout/InfiniteScroll.svelte';

  import ShopNavbar from '$container/ShopNavbar.svelte';
  import SelectPopup from '$component/SelectPopup.svelte';
  import ShopList from '$component/ShopList.svelte';
  import ShopSekeleton from '$component/skeleton/container/ShopSekeleton.svelte';
  import ShopNavbarSkeleton from '$component/skeleton/container/ShopNavbarSkeleton.svelte';
import ShopEmpty from '$component/ShopEmpty.svelte';
import GlobalBlock from '$component/common/layout/GlobalBlock.svelte';

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

  async function getProducts(
    { sort = 'alphabetical', category = 0, cursor = 0 }
    :
    { sort: string, category: number, cursor: number },
  ) {
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
            storeUrl
            badge {
              rank
              iconTheme
           }
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

  function setShopingProducts({ products }: { products: IProduct[], sort: string }) {
    shopingProducts = [
      ...shopingProducts,
      ...products,
    ];
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

  function handleClickSelectButton(e, sortField: string) {
    e.stopPropagation();
    shopingProducts = [];
    sort = sortField;
    closePopup();
  }

  function handleClickProductItem(event) {
    openBrowser(event.detail.targetUrl);
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

    getShopItems({ sort, category, cursor });
  }

  $:sortedName = SORT_FIELDS[sort];
  $:sortItems = setsortItems(SORT_FIELDS);
  $:category = selectedTab?.id || 0;
  $:infiniteScrollActive = !!shopingProducts?.length;

  const onClickRelatedItem = (e: any, type: string, id: string) => {
    e.stopPropagation();
    if (type === 'Celeb') {
      gotoCelebs(id);
    } else {
      gotoContents(id);
    }
  };
  
  console.log("shopingProducts", shopingProducts.length)

</script>

<GlobalBlock>
  
  
  {#await getShopItems({ sort, category })}
  <ShopNavbarSkeleton />
  <ShopSekeleton />
  {:then}
    {#await getTabItems()}
    <ShopNavbarSkeleton />
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

    {#if shopingProducts.length}
    <Container margin="3.2rem 0 4rem">
      <InfiniteScroll
        {infiniteScrollActive}
        end={!hasNextPage}
        on:request-more={runInfiniteScrolling}
      >
        <ShopList
          products={shopingProducts}
          {onClickRelatedItem}
          on:go-link={handleClickProductItem}
        />
      </InfiniteScroll>
    </Container>
  
    <LayoutPopup visible={isPopupVisible} {closePopup}>
      <SelectPopup
        title='정렬 기준'
        onClickSelectButton={handleClickSelectButton}
        onClickCloseButton={closePopup}
        selected={sort}
        selectItems={sortItems}
      />
    </LayoutPopup>
    {:else}
    <ShopEmpty />
    {/if}
  {:catch error}
    <ShopEmpty />
  {/await}
  
</GlobalBlock>
