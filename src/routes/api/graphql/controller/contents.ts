import { GET } from '../../../../lib/_api';
import type {
  Celeb,
  VideoContent,
} from '../../../../lib/models/backend/backend';
import relationJson from '../../../../../static/data/relation.json';
import contentJson from '../../../../../static/data/content.json';
import programJson from '../../../../../static/data/program.json';
import type { IContent } from '../../../../global/types';
import { contentsByProgramId, convertCeleb, convertContent } from './util';

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
  const contents = await GET(
    `/video-content?${new URLSearchParams(params).toString()}`,
  );
  return contents.map((content: VideoContent) => convertContent(content));
};

export const content = async ({ id }: { id: string }) => {
  const content = await GET(`/video-content/${id}?program=true`);
  return convertContent(content);
};

export const getContentsByProductId = ({ id }: { id: string }) => {
  const contentIds = relationJson
    .filter((relation) => relation.product === id)
    .map((relation) => relation.content);
  return contentJson.filter((content) => contentIds.includes(content.id));
};

export const getProgramContentsByContentId = async ({ id }: { id: string }) => {
  const content: VideoContent = await GET(`/video-content/${id}?program=true`);
  const programId = content?.ProgramInfo?.programId;
  if (!programId) {
    return [];
  }
  const contents = await contentsByProgramId(programId.toString());
  return contents.filter((content: IContent) => content.id !== id).splice(0, 2);
};

export const getMainContents = async () => {
  const contents = await GET(
    '/video-content?sort=[{views:desc}]&cursor=0&size=2&program=true',
  );
  return {
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
    contents: contents.items.map((content: VideoContent) =>
      convertContent(content),
    ),
  };
};

export const getMainInfiniteContents = async ({ limit, cursor }: {
  limit: number;
  cursor: string;
}) => {
  const response = await GET(`/video-content?size=${limit}&cursor=${cursor || 0}&type=FULL,HIGHLIGHT&program=true`);
  const contents: any[] = response.items.map((content: any) => convertContent(content));

  let startCursor = 0;
  if (contents.length > 0) {
    startCursor = contents.slice(-1)[0].id;
  }
  const hasNextPage = contents.length >= limit;

  return {
    totalCount: 0,
    contents,
    pageInfo: {
      startCursor,
      hasNextPage,
    },
  };
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
    followerCount: true,
    productCount: true,
    sort: JSON.stringify([{ createdAt: 'desc' }]),
    cursor: afterCursor || 0,
  };

  if (first) {
    params['size'] = first;
  }
  const response = await GET('/celeb', {
    method: 'GET', params,
  });
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
