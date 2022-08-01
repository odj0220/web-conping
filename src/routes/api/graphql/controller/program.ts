import { GET } from '../../../../lib/_api';
import type { Program } from '../../../../lib/models/backend/backend';
import { convertProgram } from './util';


export const programs = async () => {
  const programs = await GET('/program');
  return programs.map((program: Program) => convertProgram(program));
};

export const program = async ({ id }: { id: string }) => {
  const program = await GET(`/program/${id}`);
  return convertProgram(program);
};
