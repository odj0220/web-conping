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

export const getMainOrigin = async () => {
  const response = await GET('/program');
  const programs = response.map((program: Program) => convertProgram(program));
  return {
    title: [
      {
        text: '콜핑 오리지널',
      },
    ],
    programs: programs,
  };
};
