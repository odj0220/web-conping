<script lang="ts">
import ShortsDetailInfo from './ShortsDetailInfo.svelte';
import ShortsFullScreen from './ShortsFullScreen.svelte';

export let id: string;

const onClickClose = (e) => {
  e.stopPropagation();
  history.back();
};

const onClickShare = (e) => {
  e.stopPropagation();
};

const onClickCart = (e) => {
  e.stopPropagation();
};

const onClickProfile = (e) => {
  e.stopPropagation();
};

</script>

<ShortsFullScreen videoId="8XZe5aX5Ruk">
    <ShortsDetailInfo onClickClose={onClickClose} onClickShare={onClickShare} onClickCart={onClickCart} onClickProfile={onClickProfile} />
</ShortsFullScreen>


