import { convertProgramByFirestore, convertProgramByPlayList } from './util';
import { firestorePrograms } from '../../../../lib/_firestore';

export const getMainOrigin = async () => {
  const response = await firestorePrograms();
  const programs = response.map((program: any) => convertProgramByFirestore(program));
  return {
    title: [
      {
        text: '콘핑 오리지널',
      },
    ],
    programs: programs,
  };
};
