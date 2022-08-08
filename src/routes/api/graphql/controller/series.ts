import { convertContentByPlaylistItem, convertPopularContent } from './util';
import { playlistItems, playListVideoId } from '../../../../lib/_youtube';

export const getMainSeries = async () => {
  const programId = 'PLWeQO3UkBcB3sOdyY_aCl0pG8c5-bKbHR';
  const response = await playlistItems(programId);
  const programByVideoId = await playListVideoId();
  const contents = response?.items?.map((content:any) => convertContentByPlaylistItem({
    ...content,
    program: programByVideoId[content?.snippet?.resourceId?.videoId] ? programByVideoId[content?.snippet?.resourceId?.videoId]() : {},
  }));
  let series;
  if (contents[0].program) {
    series = contents[0].program;
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
