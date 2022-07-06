<script>
import CenterSection from '../styles/CenterSection.svelte';
import contents from '../fixtures/contents';
import Videos from './Videos.svelte';

const popularVideos = contents.splice(0, 2);

const handleClick = (id) => {
  //TODO: click 이벤트
  console.log('click : ', id);
};
</script>

<CenterSection>
  <Videos
    contents={popularVideos}
    title="지금 인기있는 영상"
    onClick={handleClick}
  />
</CenterSection>
