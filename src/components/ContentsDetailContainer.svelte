<script lang="ts">
import { page } from '$app/stores';
import { guid } from '$lib/util';
import { graphqlApi } from '$lib/_api_graphql';
import { onMount } from 'svelte';
import YP from 'youtube-player';
import type { YouTubePlayer } from 'youtube-player/dist/types';

import MetadataContainer from './MetadataContainer.svelte';
import RelationProductContainer from './RelatedProductContainer.svelte';

const id = $page.params.id;
let player: YouTubePlayer;

const playerId = guid();

const loadYoutubePlayer = () => {
  const playerVars = {
    controls: 1, //플레이어 컨드롤러 표시여부
    rel: 0, //연관동영상 표시여부
    mute: 1,
    playsinline: 1, //ios환경에서 전체화면으로 재생하지 않게하는 옵션
    autoplay: 1, //자동재생 여부(모바일에서 작동하지 않습니다. mute설정을 하면 작동합니다.)
    loop: 0,
    modestbranding: 1,
    disablekb: 1,
    enablejsapi: 1,
  };

  const option: any = {
    videoId: 'pb3bt3MBHk0',
    playerVars,
  };

  player = YP(playerId, option);
};

let productList;
const getData = async () => {
  const query = `{getProductsByContentId(id:"${id}"){id name}}`;
  const result = await graphqlApi(query);
  productList = result?.data?.getProductsByContentId;
  console.log('result', result);
};

console.log('productList', productList);

onMount(async () => {
  loadYoutubePlayer();
  getData();
});

</script>

<div class="container">
    <div class="player-wrap"><div id='{playerId}' class="youtube-player"></div></div>
    <MetadataContainer title="MZ세대의 트렌드 Y2K, 트렌드에 맞는 핵심 메이크업 비결을 알아보자!!??" airingBeginAt={1655045914850} airingEndAt={1655045914850} />
    <RelationProductContainer data={productList} />
</div>

<style lang="scss">
@import '../styles/variables.scss';
.player-wrap {
    width: 100%;
    height: auto;
    position: relative;
    padding-top: 56.25%;
    overflow: hidden;

    .youtube-player {
        z-index: 1;
        top: 0;
        left: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }
}

.comment-preview {
    padding: 1.6rem;
    .comment-title {
        display: flex;
        align-items: flex-end;
        margin-bottom: 1.6rem;
        .comment-heading {
            @include body1-700; 
            margin-right: 0.8rem;
        }
        .comment-length {
            @include caption2-400; 
            color: $disabled-8a 
        }
    }
    .comment-contents {
        display: flex;

        .comment-text {
            @include caption1-400;
            margin-left: 12px;
        }

    }
}
</style>