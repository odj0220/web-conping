import { convertContentByFirestore } from './util';
import { filterContentType, firestoreContents } from '../../../../lib/_firestore';

export const getMainShorts = async () => {
  const fireStoreData: any = await firestoreContents(6, undefined, undefined, undefined, filterContentType('SHORTS'));
  const shorts = fireStoreData.contents.map((content:any) => convertContentByFirestore(content));
  return {
    title: [
      {
        text: '많이 본 쇼츠',
      },
    ],
    contents: shorts,
  };
};
