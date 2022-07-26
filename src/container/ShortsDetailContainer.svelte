<script lang="ts">
  import { graphqlApi } from '$lib/_api';
  
  import { goBack, gotoPrograms } from '$lib/utils/goto';

  import ShortsFullScreen from '$component/ShortsFullScreen.svelte';
  import ShortsDetailInfo from '$component/ShortsDetailInfo.svelte';
  import BottomSheet from '$component/common/layout/BottomSheet.svelte';
  import RelatedProduct from '$component/RelatedProduct.svelte';
  import { callShare } from '../lib/_app_communication';

  export let id: string;

  let offsetTop = 0;

  const getContent = async () => {
    const query = `{
    content(id:"${id}"){
      id
      title
      contentType
      createDt
      description
      program {
        id
        title
        thumbnail
      }
      programId
      episode
      thumb
      videoId
      duration
      currentTime
      }
    }`;

    const { data: { content } } = await graphqlApi(query);
  
    return content;
};

  const setOffsetTop = (num: number) => {
    offsetTop = num;
  };

  const onClickClose = (e: TouchEvent) => {
    e.stopPropagation();
    goBack();
  };

  const onClickShare = (e: TouchEvent) => {
    e.stopPropagation();
    callShare('shorts', id);
  };

  const onClickCart = (e: TouchEvent) => {
    e.stopPropagation();
    setOffsetTop(176);
  };

  const onClickProfile = (e: TouchEvent, id: string) => {
    e.stopPropagation();
    gotoPrograms(id);
  };


  const getRelatedProducts = async () => {
    const query = `{getProductsByContentId(id:"${id}"){id name price exposed}}`;
    const result = await graphqlApi(query);
    const productList = result?.data?.getProductsByContentId;
    return productList;
  };

  const buttons = [
    {
      name: '공유',
      icon: 'share',
      handler: onClickShare,
    },
    {
      name: '상품',
      icon: 'cart',
      handler: onClickCart,
    },
  ];

  const returnButtons = async () => {
    let btns = [...buttons];

    let productLength = await getRelatedProducts();

    if (productLength > 0) {
      return btns;
    }

    return btns.filter(el => el.name === '공유');
  };


</script>

{#await getContent()}
{:then content}
<ShortsFullScreen
  videoId={content.videoId}
>
{#await returnButtons()}
{:then buttons}
<ShortsDetailInfo
  {onClickClose}
  {onClickProfile}
  {content}
  {buttons}
/>

{/await}
</ShortsFullScreen>
{/await}

{#await getRelatedProducts()}
{:then productData}
{#if productData.length > 0}
<BottomSheet
  height={560}
  offsetTop={offsetTop}
  setOffsetTop={setOffsetTop}
>
<RelatedProduct data={productData} />
</BottomSheet>
{/if}
{/await}
