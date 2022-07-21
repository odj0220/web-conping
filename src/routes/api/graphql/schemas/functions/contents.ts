import { GET } from '../../../../../lib/_api';
import type { VideoContent } from '../../../../../lib/models/backend/backend';
import relationJson from '../../../../../../static/data/relation.json';
import contentJson from '../../../../../../static/data/content.json';
import type { IContent } from '../../../../../global/types';
import { convertContent } from './converts';

const setOrderBy = (sortField?: string, sortOrder?: string) => {
  if (!sortField) {
    return ;
  }
  const obj:any = {};
  obj[sortField] = sortOrder || 'asc';
  return JSON.stringify(obj);
};

export const contents = async ({ sortField, sortOrder, type }: { sortField: string, sortOrder: 'desc' | 'asc', type: string }) => {
  const sort = setOrderBy(sortField, sortOrder);
  const params = JSON.parse(JSON.stringify({
    type,
    sort,
  }));
  const contents = await GET(`/video-content?${new URLSearchParams(params).toString()}`);
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

export const getContentsByProgramId = async (id: string, type?: string) => {
  const queryType = type ? '&type=' + type : '';
  const response = await GET(`/video-content?programId=${id}&program=true&sort=[{"ProgramInfo": {"episode": "desc"} }]${queryType}`);
  const contents = response.items.map((content: VideoContent) => convertContent(content));
  return contents
    .filter((content: IContent) => {
      if (!type) {
        return true;
      }
      return content.contentType === type;
    });
};

export const getProgramContentsByContentId = async ({ id }: {id: string}) => {
  const content:VideoContent = await GET(`/video-content/${id}?program=true`);
  const programId = content?.ProgramInfo?.programId;
  if (!programId) {
    return [];
  }
  const contents = await getContentsByProgramId(programId.toString());
  console.log(contents);
  return contents.filter((content: IContent) => content.id !== id).splice(0, 2);
};

export const getContentsByCelebId = ({ id }: { id: string }) => {
  const contentIds = relationJson
    .filter((relation) => relation.celeb === id)
    .map((relation) => relation.content);
  return contentJson.filter((content) => contentIds.includes(content.id));
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
