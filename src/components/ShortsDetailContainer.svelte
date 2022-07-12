<script lang="ts">
  import ProgramListContainer from './ProgramListContainer.svelte';
  import ShortsDetailInfo from './ShortsDetailContents.svelte';
  import ShortsFullScreen from './ShortsFullScreen.svelte';
  import LayoutPopup from './LayoutPopup.svelte';
  import Title from './Title.svelte';
import EpisodeContainer from './EpisodeContainer.svelte';

  export let id: string;
  let visible = false;

  const handleClickCart = () => {
    visible = !visible;
  };

</script>

<ShortsFullScreen videoId="8XZe5aX5Ruk" />
<ShortsDetailInfo onClickCart={handleClickCart} />

<LayoutPopup {visible}>
  <Title title={[{ text: '관련 상품' }]} />
  <EpisodeContainer {id} />
</LayoutPopup>