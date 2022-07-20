import { GET } from '../../../../../lib/_api';
import { Program, VideoContent } from '../../../../../lib/models/backend/backend';
import dayjs from 'dayjs';

const convertProgram = (program?: Program) => {
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

export const getMainSeries = async () => {
  const programId = '1';
  const response = await GET(`/video-content?sort=[{views:desc}]&programId=${programId}&program=true&cursor=0&size=5`);
  const contents = response.items.map((content: VideoContent) => convertContent(content));
  let series;
  if (contents[0].ProgramInfo) {
    series = convertProgram(contents[0].ProgramInfo.Program);
  }
  return {
    title: [
      {
        text: '뷰티 꿀팁 가득한',
      },
      {
        text: '#랜선뷰티',
        type: 'primary-30',
      },
      {
        text: '모아보기',
      },
    ],
    contents,
    series,
  };
};
