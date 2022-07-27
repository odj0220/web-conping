import type { Product, Program, VideoContent, Celeb } from '../../../../lib/models/backend/backend';
import dayjs from 'dayjs';
import { GET } from '../../../../lib/_api';
import type { ICeleb, IContent } from '../../../../global/types';
import type { YoutubeVideo } from '../../../../global/types';

export const convertProgram = (program?: Program) => {
  if (!program) {
    return ;
  }
  const { id, regularAiringAt, airingBeginAt, airingEndAt } = program;
  return {
    ...program,
    id: id.toString(),
    regularAiringAt: regularAiringAt ? +dayjs(regularAiringAt) : 0,
    airingBeginAt: airingBeginAt ? +dayjs(airingBeginAt) : 0,
    airingEndAt: airingEndAt ? +dayjs(airingEndAt) : 0,
  };
};

export const getThumbnail = (videoId?: string) => `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
export const convertContent = (content?: VideoContent) => {
  if (!content) {
    return ;
  }
  const { id, type, releaseAt, Video, ProgramInfo } = content;
  let program, videoId, duration, thumb, programId;
  if (ProgramInfo?.Program) {
    program = convertProgram(ProgramInfo.Program);
    programId = program?.id;
  }
  if (Video) {
    videoId = Video[0].youtubeVideoId;
    duration = dayjs.duration(Video[0].duration).asSeconds();
    thumb = getThumbnail(videoId || '');
  }

  return JSON.parse(JSON.stringify({
    ...content,
    id: id.toString(),
    programId,
    contentType: type,
    createDt: +dayjs(releaseAt),
    episode: ProgramInfo?.episode,
    videoId,
    duration,
    thumb,
    program,
  }));
};

export const convertProduct = (product?: Product, videoContentId?: number) => {
  if (!product) {
    return ;
  }
  const { id, VideoContentProduct } = product;
  let exposed;
  if (VideoContentProduct && videoContentId) {
    const videoContentProduct = VideoContentProduct.find(videoContentProduct => videoContentProduct.videoContentId === videoContentId);
    if (videoContentProduct?.VideoExposureTime) {
      exposed = videoContentProduct.VideoExposureTime.map(videoExposureTime => [(+videoExposureTime.exposedOffsetBeginMs / 1000), (+videoExposureTime.exposedOffsetEndMs / 1000)]);
    }
  }
  return JSON.parse(JSON.stringify({
    ...product,
    id: id.toString(),
    exposed,
  }));
};

export const convertCeleb = (celeb?: Celeb) => {
  if (!celeb) {
    return ;
  }
  const { id, image, backImage, CelebCategory, snsFollowerCount, productCount, videoContentCount } = celeb;
  const thumbnail = image;
  let banner = backImage;
  const countOfFollowers = snsFollowerCount || 0;
  const countOfProducts = productCount || 0;
  const countOfContents = videoContentCount || 0;

  let categories:any[] = [];
  if (CelebCategory) {
    categories = CelebCategory.map(celebCategory => celebCategory.Category);
    if (!banner) {
      banner = categories[0].backImage;
    }
  }

  return JSON.parse(JSON.stringify({
    ...celeb,
    id: id.toString(),
    thumbnail,
    banner,
    categories,
    countOfFollowers,
    countOfProducts,
    countOfContents,
  }));
};

export const shortsByCelebId = async (id: string, cursor: number, limit: number) => {
  const params: any = {
    program: true,
    sort: JSON.stringify([{ 'createdAt': 'desc' }]),
    cursor: cursor || '0',
    size: limit || 10,
    celebId: id,
    type: 'SHORTS',
  };

  const response: any = await GET('/video-content', { method: 'GET', params });

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

export const contentsByCelebId = async (id: string, cursor: number, limit: number) => {
  const params: any = {
    program: true,
    sort: JSON.stringify([{ 'createdAt': 'desc' }]),
    cursor: cursor || '0',
    size: limit || 10,
    celebId: id,
    type: 'FULL,HIGHLIGHT',
  };

  const response: any = await GET('/video-content', { method: 'GET', params });

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

export const contentsByProgramId = async (id: string, type?: string) => {
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

export const celebById = async (id: string) => {
  const params: any = {
    category: true,
    snsFollowerCount: true,
    productCount: true,
    videoContentCount: true,
  };
  const response = await GET(`/celeb/${id}`, { params });
  const celeb: ICeleb = convertCeleb(response);
  let youtubeContents, countOfYoutubeFollowers;
  if (celeb.youtubeChannelId) {
    const youtube = await GET(`/youtube/channel/${celeb.youtubeChannelId}`);
    countOfYoutubeFollowers = youtube?.statistics?.subscriberCount;
    const videos: any[] = await GET(`/youtube/channel/${celeb.youtubeChannelId}/video?f=true`) || [];

    const promises: any[] = [];
    for (let i = 0; i < videos.length; i++) {
      promises.push(youtubeToContent(videos[i]));
    }
    const response = await Promise.allSettled(promises);
    youtubeContents = response
      .filter((res: any) => res.status === 'fulfilled')
      .map((res: any) => res?.value);
  }
  return JSON.parse(JSON.stringify({
    ...celeb,
    countOfYoutubeFollowers,
    youtubeContents,
  }));
};

export const youtubeToContent = async ({ id, snippet }: YoutubeVideo) => {
  if (!id || !snippet) {
    return ;
  }
  const { videoId } = id;
  const { title, description, publishedAt } = snippet;
  const videoInfo: any = await GET(`/youtube/video/${videoId}`);
  return JSON.parse(JSON.stringify({
    id: videoId,
    videoId,
    title,
    description,
    createDt: +dayjs(publishedAt),
    duration: dayjs.duration(videoInfo?.contentDetails?.duration || 0).asSeconds(),
    views: videoInfo?.statistics?.viewCount,
    thumb: getThumbnail(videoId),
  }));
};
