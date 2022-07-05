<script>
import CenterSection from '../styles/CenterSection.svelte';

import contents from '../fixtures/contents';

import Videos from './Videos.svelte';
import Title from './Title.svelte';

const handleClick = (id) => {
  //TODO: click 이벤트
  console.log('click : ', id);
};
</script>

<CenterSection>
  <Title 
    title="지금 인기있는 영상"
  />
  <Videos
    {contents}
    onClick={handleClick}
  />
</CenterSection>
