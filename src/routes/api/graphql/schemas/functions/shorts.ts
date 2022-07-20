import { GET } from '../../../../../lib/_api';
import { VideoContent } from '../../../../../lib/models/backend/backend';
import dayjs from 'dayjs';

const getThumbnail = (videoId) => `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
const convertContent = (content2) => {
  if (!content2) {
    return;
  }
  const { id, type, releaseAt, Video, ProgramInfo } = content2;
  let program, videoId, duration, thumb, programId;
  if (ProgramInfo == null ? void 0 : ProgramInfo.Program) {
    program = convertProgram(ProgramInfo.Program);
    programId = program == null ? void 0 : program.id;
  }
  if (Video) {
    videoId = Video[0].youtubeVideoId;
    duration = dayjs.duration(Video[0].duration).asSeconds();
    thumb = getThumbnail(videoId || '');
  }
  return JSON.parse(JSON.stringify({
    ...content2,
    id: id.toString(),
    programId,
    contentType: type,
    createDt: +dayjs(releaseAt),
    episode: ProgramInfo == null ? void 0 : ProgramInfo.episode,
    videoId,
    duration,
    thumb,
    program,
  }));
};

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
