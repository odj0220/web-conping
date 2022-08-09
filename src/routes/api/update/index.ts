import type { RequestHandler } from '@sveltejs/kit';
import { celebList, contentsByVideoIds, playList, videoIdsByPlaylistId } from '../../../lib/_youtube';
import dayjs from 'dayjs';
import Duration from 'dayjs/plugin/duration.js';
import { updateDb } from '../../../lib/_firestore';
dayjs.extend(Duration);

export const get:RequestHandler = async ({ request }) => {
  const result = await results();
  return {
    body: JSON.stringify(result),
  };
};


const results = async () => {
  const programs:any = (await playList()).items.map((program: any) => ({ ...program.snippet, id: program.id }));
  const playlistPromises = programs.map((playlist: any) => videoIdsByPlaylistId(playlist.id));
  const playListResponse = await Promise.allSettled(playlistPromises);
  playListResponse
    .filter((res: any) => res.status === 'fulfilled')
    .map((res: any) => res?.value?.items.map((content: any) => ({ ...content, playlistId: res?.value?.playlistId })))
    .forEach((list: any) => {
      const playlistId = list[0].playlistId;
      const index = programs.map((program: any) => program.id).indexOf(playlistId);
      programs[index]['videoIds'] = list
        .filter((videoInfo: any) => videoInfo?.status?.privacyStatus === 'public')
        .map((videoInfo: any) => videoInfo?.contentDetails?.videoId);
    });

  const allVideoIds = programs.reduce((prev: any, current: any) => {
    return [
      ...prev,
      ...current.videoIds,
    ];
  }, []);
  const contents = await allVideos(allVideoIds.join(','), programs);
  const celebs = await celebList();

  await updateDb(programs, contents, celebs);
  return { programs, contents, celebs };
};

const allVideos = async (videoIds: any, programs: any) => {
  const contents = (await contentsByVideoIds(videoIds))?.items;
  contents.forEach((content: any) => {
    content.contentDetails = {
      ...content.contentDetails,
      duration: dayjs.duration(content.contentDetails.duration).asSeconds(),
    };
    content.snippet['type'] = content.contentDetails.duration > 40 ? 'FULL' : 'SHORTS';
  });

  return contents.map((content: any) => {
    const { id, snippet, contentDetails, status, statistics } = content;
    const { commentCount, favoriteCount, likeCount, viewCount } = statistics;
    let program;
    for (let i = 0; i < programs.length; i++) {
      const target = programs[i];
      if (target.videoIds.includes(content.id)) {
        program = target;
        break;
      }
    }
    return {
      ...snippet,
      id,
      contentDetails,
      status,
      statistics: {
        commentCount: +commentCount,
        favoriteCount: +favoriteCount,
        likeCount: +likeCount,
        viewCount: +viewCount,
      },
      program,
    };
  });
};

