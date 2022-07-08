<script lang="ts">
  import CenterSection from '../styles/CenterSection.svelte';
  import contents from '../fixtures/contents';
  import PreviewVideos from './PreviewVideos.svelte';
  import { onMount } from 'svelte';

  let videos = [];
  let scrolling = false;
  let autoPlay = true;
  let scrollTimer: any = null;

  onMount(() => {
    videos = [...contents].splice(0, 4);
  });

  function handleClick() {
    console.log('click');
  }

  function runInfiniteScrolling(event) {
    const { request } = event.detail;
    scrolling = true;
    if (request) {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const newContents = [
          {
            'id': 'content8',
            'name': '침빠곽 여행 가고 싶은 나라 순위 정하기',
            'programId': 'programId2',
            'contentType': 'full',
            'createDt': 1655145914850,
            'round': 2,
            'description': '▶관련 재생목록\n  •침착맨의 일상재롱: https://goo.gl/OJ4Uoa\n\n▶생방송 원본\n  •2022년 6월 12일 방송분: https://youtu.be/L0RnZVcKgxc\n\n▶출연\n  •곽튜브(@곽튜브KWAKTUBE), 빠니보틀(@빠니보틀 Pani Bottle), 침착맨\n\n#침착맨 #곽튜브 #빠니보틀',
            'url': 'https://www.youtube.com/embed/VoLfg_0j4Jw',
            'videoId': 'VoLfg_0j4Jw',
            'thumb': 'https://i.ytimg.com/vi/VoLfg_0j4Jw/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDbddqybIpQmSzmYaYTgDa2crU5Pw',
            'program': {
              'id': 'programId2',
              'name': 'JFlaMusic',
            },
          },
          {
            'id': 'content9',
            'name': '컵라면 나시고르자브종',
            'programId': 'programId2',
            'contentType': 'full',
            'createDt': 1655245914850,
            'round': 3,
            'description': '▶관련 영상\n  •아빠손 볶음밥: https://youtu.be/pT0XCoUbKVg\n\n▶관련 재생목록\n  •👨‍🍳불만 피우면 쿡방: https://youtube.com/playlist?list=PLi...\n\n▶생방송 원본\n  •2022년 6월 9일 방송분: https://youtu.be/uFRqHcezkXE\n\n#침착맨 #컵라면볶음밥 #쿡방',
            'url': 'https://www.youtube.com/embed/xdh1SD5SYdY',
            'videoId': 'xdh1SD5SYdY',
            'thumb': 'https://i.ytimg.com/vi/xdh1SD5SYdY/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCw48Vyii9-ujuYLVV61OIZREbvtg',
            'program': {
              'id': 'programId2',
              'name': 'JFlaMusic',
            },
          },
        ];
        videos = [...videos, ...newContents];
        scrolling = false;
      }, 500);
    }
  }
</script>

<CenterSection>
    <PreviewVideos
            contents={videos}
            infinite={true}
            scrolling={scrolling}
            autoPlay={autoPlay}
            onClick={handleClick}
            on:request-more={runInfiniteScrolling}
    />
</CenterSection>

<style lang="scss">

</style>
