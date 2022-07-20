import { GET } from '../../../../../lib/_api';
import { VideoContent } from '../../../../../lib/models/backend/backend';
import { convertProgram, convertContent } from './converts';

export const getMainSeries = async () => {
  const programId = '1';
  const response = await GET(`/video-content?sort=[{views:desc}]&programId=${programId}&program=true&cursor=0&size=5`);
  const contents = response.items.map((content: VideoContent) => convertContent(content));
  let series;
  if (contents[0].ProgramInfo) {
    series = convertProgram(contents[0].ProgramInfo.Program);
  }
  return {
    title: [
      {
        text: '뷰티 꿀팁 가득한',
      },
      {
        text: '#랜선뷰티',
        type: 'primary-30',
      },
      {
        text: '모아보기',
      },
    ],
    contents,
    series,
  };
};
