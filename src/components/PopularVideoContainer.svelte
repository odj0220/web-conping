<script lang="ts">
import CenterSection from '../styles/CenterSection.svelte';
import videos from '../fixtures/contents';
import PreviewVideos from './PreviewVideos.svelte';
import Title from './Title.svelte';
import { onMount } from 'svelte';


let contents: {data: any[]; end: boolean; cursor:string} = {
  data: videos.splice(0, 2),
  end: false,
  cursor: '',
};

onMount(() => {
  console.log('on mount');
});

const handleClick = (id) => {
  //TODO: click 이벤트
  console.log('click : ', id);
};

const handleTitleClick = () => {
  //TODO: click 이벤트
  console.log('click : 타이틀');
};

const title: any[] = [
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
    contents={contents}
    onClick={handleClick}
    infinite={false}
    autoPlay={true}
  />
</CenterSection>
