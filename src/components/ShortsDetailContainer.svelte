<script lang="ts">
import { graphqlApi } from '$lib/_api';
import BottomSheet from './common/layout/BottomSheet.svelte';
import ShortsDetailInfo from './ShortsDetailInfo.svelte';
import ShortsFullScreen from './ShortsFullScreen.svelte';
import RelatedProduct from './RelatedProduct.svelte';
import { goto } from '$app/navigation';

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

  const result = await graphqlApi(query);
  const { data: { content } } = result;
  console.log('container content', content);
  return content;
};

const setOffsetTop = (num: number) => {
  offsetTop = num;
};

const onClickClose = (e: TouchEvent) => {
  e.stopPropagation();
  history.back();
};

const onClickShare = (e: TouchEvent) => {
  e.stopPropagation();
};

const onClickCart = (e: TouchEvent) => {
  e.stopPropagation();
  setOffsetTop(176);
};

const move = (targetUrl: string) => {
  goto(targetUrl);
};

const onClickProfile = (e: TouchEvent, id: string) => {
  e.stopPropagation();
  move(`/programs/${id}`);
  console.log('profile click');
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
  console.log('product length', productLength);
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
  thumbnail={content.thumb}
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
