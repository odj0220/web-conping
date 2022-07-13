<script lang="ts">
import BottomSheet from '$component/common/layout/BottomSheet.svelte';
import RelatedProductContainer from '$component/RelatedProductContainer.svelte';
import ShortsDetailInfo from '$component/ShortsDetailInfo.svelte';
import ShortsFullScreen from '$component/ShortsFullScreen.svelte';

export let id = 'content3';
let visible = false;
let sheetHeight = 0;

const onClickClose = (e: TouchEvent) => {
  e.stopPropagation();
  history.back();
};

const onClickShare = (e: TouchEvent) => {
  e.stopPropagation();
};

const onClickCart = (e: TouchEvent) => {
  visible = !visible;
  e.stopPropagation();
  sheetHeight = 176;
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

<BottomSheet state={visible} height={sheetHeight} maxHeight={560}>
  <RelatedProductContainer {id} />
</BottomSheet>

<!-- <LayoutPopup {visible}>
    <RelatedProductContainer
    {id}
    timelineButtonVisible={false}
    />
</LayoutPopup> -->
    