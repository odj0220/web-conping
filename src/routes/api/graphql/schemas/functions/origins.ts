import { GET } from '../../../../../lib/_api';
import { Program } from '../../../../../lib/models/backend/backend';
import { convertProgram } from './converts';

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
