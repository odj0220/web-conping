<script lang="ts">
import CenterSection from '../styles/CenterSection.svelte';

import contents from '../fixtures/contents';

import PreviewVideos from './PreviewVideos.svelte';
import Title from './Title.svelte';

const popularVideos = contents.splice(0, 2);
const handleClick = (id) => {
  //TODO: click 이벤트
  console.log('click : ', id);
};

const handleTitleClick = () => {
  //TODO: click 이벤트
  console.log('click : 타이틀');
};

const title = [
  {
    text: '지금',
  },
  {
    text: '인기있는',
    type: 'primary-40',
  },
  {
    text: '영상',
  },
];

</script>

<CenterSection type="transparency">
  <Title
    {title}
    onClick={handleTitleClick}
  />
  <PreviewVideos
    contents={popularVideos}
    onClick={handleClick}
    infinite={false}
    autoPlay={true}
  />
</CenterSection>
