<script lang="ts">
  import { goto } from '$app/navigation';
import CenterSection from '$styles/CenterSection.svelte';

  import type { TitleElement } from 'src/global/types';

  import videos from '../fixtures/contents'; //TODO: 하드코딩

  import PreviewVideos from './PreviewVideos.svelte';

  import Title from './Title.svelte';

  let contents: {data: any[]; end: boolean; cursor:string} = {
    data: videos.splice(0, 2),
    end: false,
    cursor: '',
  };

  const handleClickContents = (id: string) => {
    goto(`contents/${id}`);
  };

  const title: TitleElement[] = [
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

<CenterSection type="transparency">
  <Title
    {title}
  />
  <PreviewVideos
    contents={contents}
    onClickContents={handleClickContents}
    infinite={false}
    autoPlay={true}
  />
</CenterSection>
