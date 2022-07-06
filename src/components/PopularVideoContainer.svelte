<script lang="ts">
import CenterSection from '../styles/CenterSection.svelte';

import contents from '../fixtures/contents';

import Videos from './Videos.svelte';
import Title from './Title.svelte';

const handleClick = (id: string) => {
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
  <Videos
    {contents}
    onClick={handleClick}
  />
</CenterSection>
