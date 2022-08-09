import { createParams } from './_api';

interface fetchOption {
    method?: string;
    body?: any;
    params?: any;
    headers?: any;
    responseType?: string;
}

const defaultOption = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3';
const YOUTUBE_KEY = 'AIzaSyAXcRXKhdtIedFRiQ7KU8d6fZwO_zZfrJk';
const GOLLALA_CHANNEL_ID = 'UCQU44DD_X3LwgHjTPvs9LvQ';
const INFLUENCER_SECTION_ID = 'UCQU44DD_X3LwgHjTPvs9LvQ.__WLXNpu6u8';

export const popularContents = async (limit = 5, cursor = '', order = 'viewCount') => {
  const response:any = await api('/search', {
    params: {
      part: 'snippet',
      key: YOUTUBE_KEY,
      channelId: GOLLALA_CHANNEL_ID,
      maxResults: limit,
      type: 'video',
      pageToken: cursor,
      order,
    },
  });
  const playlistInfoByVideoId: any = await playListVideoId();
  const contents = response.items.map((item: any) => {
    const videoId = item.id.videoId;
    let program;
    try {
      program = playlistInfoByVideoId[item.id.videoId]();
    } catch (e) {
      program = null;
    }
    return {
      ...item.snippet,
      id: videoId,
      videoId,
      program,
    };
  }).filter((content: any) => content.program);


  return {
    totalCount: response?.pageInfo?.totalResults,
    contents,
    pageInfo: {
      startCursor: response?.nextPageToken,
      hasNextPage: !!response?.nextPageToken,
    },
  };
};

export const playlistItems = (playlistId: string) => {
  return api('/playlistItems', {
    params: {
      part: 'snippet,status',
      key: YOUTUBE_KEY,
      playlistId,
    },
  });
};

export const playList = () => {
  return api('/playlists', {
    params: {
      part: 'snippet',
      key: YOUTUBE_KEY,
      channelId: GOLLALA_CHANNEL_ID,
      maxResults: 50,
    },
  });
};

export const playListVideoId = async () => {
  const response = await api('/playlists', {
    params: {
      part: 'snippet',
      key: YOUTUBE_KEY,
      channelId: GOLLALA_CHANNEL_ID,
      maxResults: 50,
    },
  });
  const programs = response.items.reduce((pre:any, cur:any) => ({ ...pre, [cur.id]: { id: cur.id, ...cur.snippet } }), {});
  const playlistPromises = response.items.map((playlist: any) => videoIdsByPlaylistId(playlist.id));
  const playListResponse = await Promise.allSettled(playlistPromises);
  const youtubeContents = playListResponse
    .filter((res: any) => res.status === 'fulfilled')
    .map((res: any) => res?.value?.items.map((content: any) => ({ ...content, playlistId: res?.value?.playlistId })))
    .reduce((pre: any, current: any) => {
      let result = {};
      const array = [];
      current
        .filter((item: any) => item?.status?.privacyStatus === 'public')
        .forEach((item:any) => {
          const videoId = item?.contentDetails?.videoId;
          result = {
            ...result,
            [videoId]: () => programs[item?.playlistId],
          };
        });
      return {
        ...pre,
        ...result,
      };
    }, {});
  return youtubeContents;
};

export const celebList = async () => {
  const channels = (await api('/channelSections', {
    params: {
      part: 'contentDetails',
      key: YOUTUBE_KEY,
      maxResults: 50,
      id: INFLUENCER_SECTION_ID,
    },
  })).items[0].contentDetails.channels;

  const celebs = (await api('/channels', {
    params: {
      part: 'snippet,brandingSettings,statistics,topicDetails',
      key: YOUTUBE_KEY,
      maxResults: 50,
      id: channels.join(','),
    },
  })).items;

  return celebs.map((celeb: any) => {
    const { id, snippet, statistics, topicDetails, brandingSettings } = celeb;
    return { ...snippet, id, statistics, topicDetails, brandingSettings };
  });
};

export const videoIdsByPlaylistId = async (playlistId: string) => {
  const response = await api('/playlistItems', {
    params: {
      part: 'contentDetails, status',
      key: YOUTUBE_KEY,
      playlistId,
      maxResults: 50,
    },
  });
  return {
    ...response,
    playlistId,
  };
};

export const contentsByVideoIds = (videoIds: string) => {
  return api('/videos', {
    params: {
      part: 'snippet,contentDetails,statistics,status',
      key: YOUTUBE_KEY,
      id: videoIds,
    },
  });
};

function api(url: string, option: fetchOption) {
  let params = '';
  let requestUrl = `${YOUTUBE_URL}${url}`;

  if (option.params) {
    params = createParams(option.params);
    requestUrl += `?${params}`;
  }

  return fetch(requestUrl, {
    ...option,
    body: option.body ? JSON.stringify(option.body) : null,
  })
    .then(res => {
      if (option.responseType === 'text') {
        return res.text();
      }
      return res.json();
    });
}

function GET(url: string, option?: fetchOption) {
  return api(url, {
    ...defaultOption,
    ...option,
    method: 'GET',
  });
}

function POST(url: string, option?: fetchOption) {
  return api(url, {
    ...defaultOption,
    ...option,
    method: 'POST',
  });
}

function DELETE(url: string, option?: fetchOption) {
  return api(url, {
    ...defaultOption,
    ...option,
    method: 'DELETE',
  });
}

function PATCH(url: string, option?: fetchOption) {
  return api(url, {
    ...defaultOption,
    ...option,
    method: 'PATCH',
  });
}




