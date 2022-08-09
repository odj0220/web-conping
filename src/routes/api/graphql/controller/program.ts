import { convertProgramByFirestore } from './util';
import { firestoreProgramById, firestorePrograms } from '../../../../lib/_firestore';


export const programs = async () => {
  const programs = await firestorePrograms();
  return programs.map((program: any) => convertProgramByFirestore(program));
};

export const program = async ({ id }: { id: string }) => {
  const program = await firestoreProgramById(id);
  return convertProgramByFirestore(program);
};
