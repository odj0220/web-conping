import type { Product, Program, VideoContent, Celeb } from '../../../../lib/models/backend/backend';
import dayjs from 'dayjs';
import { GET } from '../../../../lib/_api';
import type { IContent } from '../../../../global/types';

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
  /*type Celeb {
    id: String!
    name: String!
    description: String
    categories: [Category]
    thumbnail: String
    banner: String
    countOfFollowers: Float
    countOfYotubeFollowers:Float
    countOfInstagramFollowers:Float
    countOfProducts: Float
    countOfContents: Float

    youtubeUrl: String
    instagramUrl: String
    gender: String
    nationality: String
  }
  */

  if (!celeb) {
    return ;
  }
  const { id, image, backImage, CelebCategory, snsFollowerCount, productCount, videoContentCount } = celeb;
  const thumbnail = image;
  const banner = backImage;
  const countOfFollowers = snsFollowerCount || 0;
  const countOfProducts = productCount || 0;
  const countOfContents = videoContentCount || 0;

  let categories:any[] = [];

  if (CelebCategory) {
    categories = CelebCategory.map(celebCategory => celebCategory.Category);
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
