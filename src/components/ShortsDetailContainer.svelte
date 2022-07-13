<script lang="ts">
import BottomSheet from './common/layout/BottomSheet.svelte';
import RelatedProductContainer from './RelatedProductContainer.svelte';
import ShortsDetailInfo from './ShortsDetailInfo.svelte';
import ShortsFullScreen from './ShortsFullScreen.svelte';

export let id: string;

let offsetTop = 0;
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

const onClickProfile = (e: TouchEvent) => {
  e.stopPropagation();
};
</script>

<ShortsFullScreen videoId="8XZe5aX5Ruk">
  <ShortsDetailInfo
    onClickClose={onClickClose}
    onClickShare={onClickShare}
    onClickCart={onClickCart}
    onClickProfile={onClickProfile}
  />
</ShortsFullScreen>

<BottomSheet height={560} setOffsetTop={setOffsetTop} offsetTop={offsetTop}>
  <RelatedProductContainer {id} moreButton={false}/>
</BottomSheet>
