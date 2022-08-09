import relationJson from '../../../../../static/data/relation.json';
import contentJson from '../../../../../static/data/content.json';
import type { ICeleb } from '../../../../global/types';
import {
  celebById,
  convertContent,
  convertContentByFirestore,
} from './util';
import {
  filterContentType,
  firestoreContentById,
  firestoreContents, firestoreContentsByProgramId,
} from '../../../../lib/_firestore';

const setOrderBy = (sortField?: string, sortOrder?: string) => {
  if (
    !sortField ||
      (
        sortField !== 'latest' &&
          sortField !== 'popularity' &&
          sortField !== 'alphabetical'
      )
  ) {
    return ;
  }

  let field = '';

  switch (sortField) {
  case 'latest':
    field = 'createdAt';
    break;
  case 'popularity':
    field = 'views';
    break;
  case 'alphabetical':
    field = 'title';
    break;
  }

  const obj:any = {};
  obj[sortField] = sortOrder || 'asc';
  return JSON.stringify(obj);
};

export const contents = async ({
  sortField,
  sortOrder,
  type,
}: {
  sortField: string;
  sortOrder: 'desc' | 'asc';
  type: string;
}) => {
  const sort = setOrderBy(sortField, sortOrder);
  const params = JSON.parse(
    JSON.stringify({
      type,
      sort,
    }),
  );
  const contents = await firestoreContents(999, undefined, undefined, sortOrder, filterContentType(type));
  return contents.contents.map((content: any) => convertContentByFirestore(content));
};

export const content = async ({ id }: { id: string }) => {
  const content = await firestoreContentById(id);
  return convertContentByFirestore(content);
};

export const getContentsByProductId = ({ id }: { id: string }) => {
  const contentIds = relationJson
    .filter((relation) => relation.product === id)
    .map((relation) => relation.content);
  return contentJson.filter((content) => contentIds.includes(content.id));
};

export const getProgramContentsByContentId = async ({ id }: { id: string }) => {
  const content = await firestoreContentById(id);
  const programId = content?.program?.id;
  if (!programId) {
    return [];
  }
  const contents = await firestoreContentsByProgramId(programId);
  return contents.contents.filter((content) => content.id !== id).splice(0, 2).map((content: any) => convertContentByFirestore(content));
};

export const getMainContents = async () => {
  const fireStoreData: any = await firestoreContents(2, undefined, undefined, undefined, filterContentType('FULL'));
  const contents = fireStoreData.contents.map((content:any) => convertContentByFirestore(content));
  const result = {
    title: [
      {
        text: '지금',
      },
      {
        text: '인기있는',
        type: 'primary-30',
      },
      {
        text: '콘텐츠',
      },
    ],
    contents: contents,
  };

  return result;
};

export const getMainInfiniteContents = async ({ limit, cursor }: {
  limit: number;
  cursor: string;
}) => {
  const result = await firestoreContents(limit, cursor, 'publishedAt', 'desc', filterContentType('FULL'));
  return {
    ...result,
    contents: result.contents.map((content:any) => convertContentByFirestore(content)),
  };
};


export const getYoutubeContentsByCelebId = async ({ id }: {id: string}) => {
  const celeb: ICeleb = await celebById(id);
  return {
    title: [
      {
        text: `${celeb.name} 유튜브`,
      },
    ],
    contents: celeb.youtubeContents,
    url: `https://www.youtube.com/channel/${celeb.youtubeChannelId}`,
  };
};
