<script lang="ts">
import LayoutPopup from './LayoutPopup.svelte';
import RelatedProductContainer from './RelatedProductContainer.svelte';
import ShortsDetailInfo from './ShortsDetailInfo.svelte';
import ShortsFullScreen from './ShortsFullScreen.svelte';

export let id: string;
let visible = false;

const onClickClose = (e) => {
  e.stopPropagation();
  history.back();
};

const onClickShare = (e) => {
  e.stopPropagation();
};

const onClickCart = () => {
  visible = !visible;
};

const onClickProfile = (e) => {
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

<LayoutPopup {visible}>
  <RelatedProductContainer
    {id}
    timelineButtonVisible={false}
  />
</LayoutPopup>
