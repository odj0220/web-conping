import type { Product, Program, VideoContent, Celeb, VideoContentProduct } from '../../../../lib/models/backend/backend';
import dayjs from 'dayjs';
import { GET } from '../../../../lib/_api';
import type { ICeleb, IContent } from '../../../../global/types';
import type { YoutubeVideo } from '../../../../global/types';
import { filterContentType, firestoreContentsByProgramId } from '../../../../lib/_firestore';

export const EXPOSED_DEFAULT_DURATION = 3000;

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

export const convertProgramByChannel = (channelInfo: any) => {
  const thumbnail = channelInfo?.thumbnails?.default?.url;
  const airingBeginAt = channelInfo?.publishedAt;
  const regularAiringAt = channelInfo?.publishedAt;
  return {
    ...channelInfo,
    thumbnail,
    airingBeginAt,
    regularAiringAt,
  };
};

export const convertPopularContent = (content: any) => {
  const createDt = +dayjs(content?.publishedAt);
  return JSON.parse(JSON.stringify({
    ...content,
    createDt,
    programId: content?.program?.id,
    contentType: 'FULL',
    thumb: getThumbnail(content.videoId || ''),
    program: convertProgramByChannel(content.program),
  }));
};

export const convertContentByPlaylistItem = (content: any) => {
  const videoId = content?.snippet?.resourceId?.videoId;
  const createDt = +dayjs(content?.publishedAt);
  return JSON.parse(JSON.stringify({
    ...content.snippet,
    id: videoId,
    createDt,
    videoId,
    programId: content?.program?.id,
    contentType: 'FULL',
    thumb: getThumbnail(videoId || ''),
    program: convertProgramByChannel(content.program),
  }));
};


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

  const { id, VideoContentProduct, CelebProduct } = product;
  let exposed: number[][] = [];
  const relatedItems: any[] = [];

  if (VideoContentProduct && VideoContentProduct.length) {
    const content = convertContent(VideoContentProduct[0].VideoContent);
    relatedItems.push({
      id: content.id,
      type: 'Content',
      title: content.title,
      thumbnail: content.thumb,
    });

    if (videoContentId) {
      const videoContentProduct = VideoContentProduct.find(videoContentProduct => videoContentProduct.videoContentId === videoContentId);
      if (videoContentProduct?.VideoExposureTime) {
        exposed = videoContentProduct.VideoExposureTime.map(videoExposureTime => {
          const begin = videoExposureTime.exposedOffsetBeginMs;
          const end = videoExposureTime.exposedOffsetEndMs || begin + EXPOSED_DEFAULT_DURATION;
          return [(+begin / 1000), (+end / 1000)];
        });
      }
    }
  }

  if (CelebProduct && CelebProduct.length) {
    const celeb = convertCeleb(CelebProduct[0].Celeb);
    relatedItems.push({
      id: celeb.id,
      type: 'Celeb',
      title: celeb.name,
      thumbnail: celeb.image,
    });
  }

  return JSON.parse(JSON.stringify(
    {
      id: id.toString(),
      name: product?.name,
      brand: product?.Brand?.name,
      price: product?.price,
      discountRate: product?.discountRate,
      image: product?.image,
      exposed,
      storeUrl: product?.storeUrl,
      views: product?.views,
      createDt: +new Date(product?.createdAt),
      relatedItems,
    },
  ));
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

export const contentsByProgramId = async (id: string, type?:string) => {
  const response = await firestoreContentsByProgramId(id, 50, undefined, 'publishedAt', 'desc', type ? filterContentType(type) : undefined);
  const contents = response.contents.map((content: any) => convertContentByFirestore(content));
  return contents;
};

export const productsByCelebId = async (id: string, limit: number, cursor: number) => {
  const params:any = {
    pagingType: 'cursor',
    cursor: cursor || 0,
    sort: '[{"createdAt":"desc"}]',
    size: limit || 10,
    celeb: true,
    celebId: id,
  };
  const response: any = await GET('/product', { params: params });
  const products = response.elements.map((product: any) => {
    return {
      id: product.id,
      name: product.name,
      brand: product.Brand.name,
      price: product.price,
      discountRate: product.discountRate,
      storeUrl: product.storeUrl,
      image: product.image,
      views: product.views,
      createDt: +new Date(product.createdAt),
    };
  });

  let startCursor = 0;
  if (products.length > 0) {
    startCursor = products.slice(-1)[0].id;
  }

  const hasNextPage = products.length >= limit;

  return {
    totalCount: 0,
    products,
    pageInfo: {
      startCursor,
      hasNextPage,
    },
  };
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

export const convertProgramByPlayList = async ({ id, snippet }: any) => {
  if (!id || !snippet) {
    return ;
  }
  const { thumbnails, publishedAt } = snippet;
  return JSON.parse(JSON.stringify({
    id,
    ...snippet,
    createDt: +dayjs(publishedAt),
    airingBeginAt: +dayjs(publishedAt),
    thumbnail: thumbnails?.high?.url,
    banner: thumbnails?.high?.url,
  }));
};

export const durationToSeconds = (duration: string) => {
  return dayjs.duration(duration).asSeconds();
};


export const convertContentByFirestore = (content: any) => {
  const createDt = +dayjs(content?.publishedAt);
  const { id, type, statistics, contentDetails, program } = content;
  return JSON.parse(JSON.stringify({
    ...content,
    createDt,
    programId: id,
    contentType: type,
    videoId: id,
    thumb: getThumbnail(id || ''),
    views: statistics?.viewCount,
    program: convertProgramByFirestore(program),
    duration: contentDetails?.duration,
  }));
};

export const convertProgramByFirestore = (channelInfo: any) => {
  const { id, thumbnails, publishedAt } = channelInfo;
  const thumbnail = thumbnails?.high?.url;
  const airingBeginAt = publishedAt;
  const regularAiringAt = publishedAt;

  let banner = thumbnail;
  if (id === 'PLWeQO3UkBcB16CyWkwkigJsisnNSzbwrh') {
    banner = 'https://yt3.ggpht.com/3eR1TISpkHimmosSEq-PJMoXe7_d1TclSjoOaqY_jZSj0sr9O9ZZjTYH9bmXVX8yw7ZMr87lsw';
  } else if (id === 'PLWeQO3UkBcB3XSMF5HJ_umXOzQVqiD-JV') {
    banner = 'https://yt3.ggpht.com/-M0WuI-jS90PSv6avFM-GYFdmHhTwthAZd9oYUcjUE3VCxmI8-GtwlMi9CPL7tqFrpV_aXPlFQ';
  } else if (id === 'PLWeQO3UkBcB3sOdyY_aCl0pG8c5-bKbHR') {
    banner = '/images/Home_Banner_01.png';
  }
  return {
    ...channelInfo,
    thumbnail,
    banner,
    airingBeginAt,
    regularAiringAt,
  };
};

export const convertCelebByFirestore = (celeb?: any) => {
  if (!celeb) {
    return ;
  }
  const { id, brandingSettings, statistics, thumbnails, topicDetails } = celeb;
  const thumbnail = thumbnails?.high?.url;
  const banner = brandingSettings?.image?.bannerExternalUrl;
  const countOfFollowers = statistics?.subscriberCount || 0;
  const countOfProducts = 0;
  const countOfContents = statistics?.videoCount || 0;
  const countOfYoutubeFollowers = statistics?.subscriberCount || 0;

  let categories:any[] = [];
  if (topicDetails?.topicCategories) {
    categories = topicDetails?.topicCategories.map((url:string) => {
      const split = url.split('/');
      return {
        name: split[split.length - 1],
        fontColor: '#0A0A0A',
        backColor: '#BE65F2',
      };
    });
  }

  return JSON.parse(JSON.stringify({
    ...celeb,
    id: id.toString(),
    name: celeb.title,
    thumbnail,
    banner,
    categories,
    countOfFollowers,
    countOfProducts,
    countOfContents,
    countOfYoutubeFollowers,
  }));
};

