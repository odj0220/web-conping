import celebJson from '../../../../../static/data/celeb.json';
import relationJson from '../../../../../static/data/relation.json';
import contentJson from '../../../../../static/data/content.json';
import { GET } from '../../../../lib/_api';
import type { Celeb, VideoContentCast } from '../../../../lib/models/backend/backend';
import { celebById, convertCeleb, convertCelebByFirestore } from './util';
import { firestoreCeleb, firestoreCelebById } from '../../../../lib/_firestore';

export const celebs = async () => {
  const response: any = await firestoreCeleb();
  const celebs = response.map((celeb: any) => convertCelebByFirestore(celeb));

  return celebs;
};

export const celeb = async ({ id }: { id: string }) => {
  return convertCelebByFirestore(await firestoreCelebById(id));
};

export const getCelebsByContentId = async ({ id }: { id: string }) => {
  const celebsResponse = await GET('/celeb', { params: { videoContentId: id } });
  const celebs = celebsResponse.map((celeb: Celeb) => convertCeleb(celeb));
  return celebs;
};

export const getCelebsByProductId = ({ id }: { id: string }) => {
  const celebIds = relationJson
    .filter((relation) => relation.product === id)
    .map((relation) => relation.celeb);
  return celebJson.filter((celeb) => celebIds.includes(celeb.id));
};

export const getCelebsByProgramId = async ({ id }: { id: string }) => {
  const celebsResponse = await GET('/celeb', { params: { programId: id } });
  const celebs = celebsResponse.map((celeb: Celeb) => convertCeleb(celeb));
  return celebs;
};

export const getInfiniteCelebs = async ({
  first,
  afterCursor,
}: {
  first: number;
  afterCursor: string;
}) => {
  const response:any = await firestoreCeleb(first, afterCursor);
  const { celebs, pageInfo } = response;
  const edges = celebs.map((celeb: any) => {
    const node = convertCelebByFirestore(celeb);
    return {
      node,
      cursor: node.id,
    };
  });

  return {
    totalCount: 0,
    edges,
    pageInfo,
  };
};
