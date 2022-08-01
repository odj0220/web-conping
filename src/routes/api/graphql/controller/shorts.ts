import { GET } from '../../../../lib/_api';
import type { VideoContent } from '../../../../lib/models/backend/backend';
import { convertContent } from './util';

export const getMainShorts = async () => {
  const response = await GET('/video-content?sort=[{views:desc}]&type=SHORTS&cursor=0&size=6');
  const shorts = response.items.map((content: VideoContent) => convertContent(content));
  return {
    title: [
      {
        text: '많이 본 쇼츠',
      },
    ],
    contents: shorts,
  };
};
