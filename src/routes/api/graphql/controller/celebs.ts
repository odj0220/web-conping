import celebJson from '../../../../../static/data/celeb.json';
import relationJson from '../../../../../static/data/relation.json';
import contentJson from '../../../../../static/data/content.json';
import { GET } from '../../../../lib/_api';
import type { Celeb, VideoContentCast } from '../../../../lib/models/backend/backend';
import { celebById, convertCeleb, convertCelebByFirestore } from './util';
import { firestoreCeleb } from '../../../../lib/_firestore';

export const celebs = async () => {
  const response: any = await firestoreCeleb();
  const celebs = response.map((celeb: any) => convertCelebByFirestore(celeb));

  return celebs;
};

export const celeb = async ({ id }: { id: string }) => {
  return await celebById(id);
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
  const params: any = {
    category: true,
    snsFollowerCount: true,
    productCount: true,
    videoContentCount: true,
    sort: JSON.stringify([{ createdAt: 'desc' }]),
    cursor: afterCursor || 0,
  };

  if (first) {
    params['size'] = first;
  }
  const response = await GET('/celeb', { params });
  const edges = response.map((celeb: Celeb) => {
    const node = convertCeleb(celeb);
    return {
      node,
      cursor: node.id,
    };
  });

  let startCursor = 0;
  if (edges.length > 0) {
    startCursor = edges[edges.length - 1].node.id;
  }
  const hasNextPage = edges.length >= first;

  return {
    totalCount: 0,
    edges,
    pageInfo: {
      startCursor,
      hasNextPage,
    },
  };
};
