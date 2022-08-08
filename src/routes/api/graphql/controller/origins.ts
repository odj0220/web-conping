import type { Program } from '../../../../lib/models/backend/backend';
import { convertProgramByPlayList } from './util';
import { playList } from '../../../../lib/_youtube';

export const getMainOrigin = async () => {
  const response = await playList();
  const programs = response.items.map((program: Program) => convertProgramByPlayList(program));
  return {
    title: [
      {
        text: '콘핑 오리지널',
      },
    ],
    programs: programs,
  };
};
