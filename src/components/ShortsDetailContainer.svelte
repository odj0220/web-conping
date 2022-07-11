<script lang="ts">
import ShortsDetailInfo from './ShortsDetailContents.svelte';
import ShortsFullScreen from './ShortsFullScreen.svelte';

const onClick = () => {
  console.log('onClick');
};

</script>

<ShortsFullScreen videoId="8XZe5aX5Ruk" />
<ShortsDetailInfo onClick={onClick} />
