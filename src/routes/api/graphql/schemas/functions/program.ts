import { GET } from '../../../../../lib/_api';
import { Program } from '../../../../../lib/models/backend/backend';
import dayjs from 'dayjs';

const convertProgram = (program?: Program) => {
  if (!program) {
    return ;
  }
  const { id, regularAiringAt, airingBeginAt, airingEndAt } = program;
  return {
    ...program,
    id: id.toString(),
    regularAiringAt: regularAiringAt ? +dayjs(regularAiringAt) : 0,
    airingBeginAt: airingBeginAt ? +dayjs(airingBeginAt) : 0,
    airingEndAt: airingEndAt ? +dayjs(airingEndAt) : 0,
  };
};


export const programs = async () => {
  const programs = await GET('/program');
  return programs.map((program: Program) => convertProgram(program));
};

export const program = async ({ id }: { id: string }) => {
  const program = await GET(`/program/${id}`);
  return convertProgram(program);
};
