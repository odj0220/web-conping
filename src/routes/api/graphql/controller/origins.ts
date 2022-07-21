import { GET } from '../../../../lib/_api';
import type { Program } from '../../../../lib/models/backend/backend';
import { convertProgram } from './util';

export const getMainOrigin = async () => {
  const response = await GET('/program');
  const programs = response.map((program: Program) => convertProgram(program));
  return {
    title: [
      {
        text: '콘핑 오리지널',
      },
    ],
    programs: programs,
  };
};
