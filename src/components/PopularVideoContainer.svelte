<script lang="ts">
import CenterSection from '../styles/CenterSection.svelte';
import videos from '../fixtures/contents';
import PreviewVideos from './PreviewVideos.svelte';
import Title from './Title.svelte';


let contents: {data: any[]; end: boolean; cursor:string} = {
  data: videos.splice(0, 2),
  end: false,
  cursor: '',
};

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
    text: '콘텐츠',
  },
];

</script>

<section class="section">
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
</section>

<style lang="scss">
  .section {
    padding: 0 1.6rem;
    margin: 4rem 0 0 0;
  }
</style>