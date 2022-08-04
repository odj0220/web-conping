import { GET } from '../../../../lib/_api';
import type {
  Celeb,
  VideoContent,
} from '../../../../lib/models/backend/backend';
import relationJson from '../../../../../static/data/relation.json';
import contentJson from '../../../../../static/data/content.json';
import programJson from '../../../../../static/data/program.json';
import type { ICeleb, IContent } from '../../../../global/types';
import { celebById, contentsByProgramId, convertCeleb, convertContent, convertPopularContent } from './util';
import { popularContents } from '../../../../lib/_youtube';

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
  const popular = await popularContents();
  const contents = popular.contents.slice(0, 2).map((content:any) => convertPopularContent(content));
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
  const result = await popularContents(limit, cursor, 'date');
  return {
    ...result,
    contents: result.contents.map((content:any) => convertPopularContent(content)),
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
