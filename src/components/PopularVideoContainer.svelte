<script lang="ts">
import CenterSection from '../styles/CenterSection.svelte';

import contents from '../fixtures/contents';

import Videos from './Videos.svelte';
import Title from './Title.svelte';

const handleClick = (id: string) => {
  //TODO: click 이벤트
  console.log('click : ', id);
};

const title = [
  {
    text: '지금',
  },
  {
    text: '인기있는',
    color: '#BE65F2',
  },
  {
    text: '영상',
  },
];

</script>

<CenterSection>
  <Title {title} />
  <Videos
    {contents}
    onClick={handleClick}
  />
</CenterSection>
