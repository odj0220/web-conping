import { convertContentByFirestore, convertContentByPlaylistItem, convertPopularContent } from './util';
import { filterContentType, firestoreContentsByProgramId } from '../../../../lib/_firestore';

export const getMainSeries = async () => {
  const programId = 'PLWeQO3UkBcB3sOdyY_aCl0pG8c5-bKbHR';
  const response:any = await firestoreContentsByProgramId(programId, undefined, undefined, 'publishedAt', undefined, filterContentType('FULL'));
  const contents = response?.contents.map((content:any) => convertContentByFirestore(content));
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
