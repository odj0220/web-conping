import { GET } from '../../../../lib/_api';
import type { VideoContent } from '../../../../lib/models/backend/backend';
import relationJson from '../../../../../static/data/relation.json';
import contentJson from '../../../../../static/data/content.json';
import programJson from '../../../../../static/data/program.json';
import type { IContent } from '../../../../global/types';
import { contentsByProgramId, convertContent } from './util';

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

export const contents = async ({ sortField, sortOrder, type, limit, afterCursor, celeb, program }: {
  sortField: string,
  sortOrder: 'desc' | 'asc',
  type: string,
  limit: number,
  afterCursor: string
  celeb: number;
  program: number;
}) => {
  const sort = setOrderBy(sortField, sortOrder);

  const params: any = {
    program: true,
    celeb: true,
    sort: JSON.stringify([{ 'views': 'desc' }]),
    cursor: afterCursor || '0',
    size: limit || 10,
  };

  if (type) {
    params['type'] = type;
  }

  if (celeb) {
    params['celebId'] = celeb;
  }

  if (program) {
    params['programId'] = program;
  }

  const response = await GET('/video-content', { method: 'GET', params });

  const edges = response.items.map((content: any) => {
    const node = convertContent(content);
    const cursor = node.id;
    return {
      node,
      cursor,
    };
  });

  let startCursor = 0;
  if (edges.length > 0) {
    startCursor = edges[edges.length - 1].node.id;
  }
  const hasNextPage = edges.length >= limit;

  return {
    totalCount: 0,
    edges,
    pageInfo: {
      startCursor,
      hasNextPage,
    },
  };
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

export const getProgramContentsByContentId = async ({ id }: {id: string}) => {
  const content:VideoContent = await GET(`/video-content/${id}?program=true`);
  const programId = content?.ProgramInfo?.programId;
  if (!programId) {
    return [];
  }
  const contents = await contentsByProgramId(programId.toString());
  return contents.filter((content: IContent) => content.id !== id).splice(0, 2);
};

export const getContentsByCelebId = ({ id, type, limit }: { id: string, type: string, limit: number}) => {
  const contentIds = relationJson
    .filter((relation) => relation.celeb === id)
    .map((relation) => relation.content);

  let contents = contentJson
    .map((c) => {
      return {
        ...c,
        program: programJson.find((p) => p.id === c.programId),
      };
    })
    .filter((content) => contentIds.includes(content.id))
    .sort((contentA, contentB) => contentB.createDt - contentA.createDt);

  if (type) {
    contents = contents.filter((c) => c.contentType === type);
  }

  if (limit > 0) {
    contents = contents.splice(0, limit);
  }

  return contents;
};

export const getMainContents = async () => {
  const contents = await GET('/video-content?sort=[{views:desc}]&cursor=0&size=2&program=true');
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
    contents: contents.items.map((content: VideoContent) => convertContent(content)),
  };
};

export const getMainInfiniteContents = async ({ first, afterCursor }: {
  first: number;
  afterCursor: string;
}) => {
  const response = await GET(`/video-content?size=${first}&cursor=${afterCursor || 0}&type=FULL,HIGHLIGHT&program=true`);
  const edges = response.items.map((content: VideoContent) => {
    const node = convertContent(content);
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
