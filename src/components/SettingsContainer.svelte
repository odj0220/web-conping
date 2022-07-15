<script lang="ts">
import { appCheck, openBrowser } from '$lib/util';
import { getVersion, launchSystemNotification, launchTel } from '$lib/_app_communication';
import { onMount } from 'svelte';
import SettingsBanner from './SettingsBanner.svelte';
import SettingsContact from './SettingsContact.svelte';
import SettingsMenuList from './SettingsMenuList.svelte';
import SubHeaderContainer from './SubHeaderContainer.svelte';

let isApp: boolean;
let appVersion = '알 수 없음';
let csState = false;
const setCSState = (bool: boolean) => {
  csState = bool;
};

//TODO: notice, FAQ, 문의하기, 서비스이용약관, 개인정보처리방침, brand,celeb(배너) url 수정
const onClick = (category: string) => {
  switch (category) {
  case 'brand': openBrowser('https://naver.com'); break;
  case 'celeb': openBrowser('https://naver.com'); break;
  case '공지사항': openBrowser('https://naver.com'); break;
  case 'FAQ': openBrowser('https://naver.com'); break;
  case '문의하기': openBrowser('https://naver.com'); break;
  case '서비스 이용약관': openBrowser('https://naver.com'); break;
  case '개인정보 처리방침': openBrowser('https://naver.com'); break;
  case '푸쉬 알림 설정': openBrowser('https://naver.com'); break;
  case '버전 정보': break;
  default: break;
  }
};

const menuList = [
  {
    depth1: '고객센터',
    depth2: [
      { title: '공지사항' },
      {'FAQ'},
      '문의하기',
      '서비스 이용약관',
      '개인정보 처리방침',
    ],
  },
  {
    depth1: '기타',
    depth2: [
      '푸쉬 알림 설정',
      '버전 정보',
    ],
  },
];

const csList = [
  {
    textBig: '02-6245-1111',
    textSmall: '고객센터 전화 문의',
    icon: 'call',
  },
  {
    textBig: '콘핑 네이버톡톡',
    textSmall: '메세지 문의',
    icon: 'naverTalkTalk',
  },
];

const bannerList = [
  {
    name: 'brand',
    image: '',
  },
  {
    name: 'celeb',
    image: '',
  },
];

onMount(async () => {
  if (appCheck()) {
    isApp = true;
    const version = await getVersion();
    if (version) {
      const { major, minor, build } = JSON.parse(version);
      appVersion = `${major}.${minor}.${build}`;
    }
  }
});

</script>

<SubHeaderContainer title="고객센터" share={false} />
<SettingsBanner {bannerList} {onClick} />
<SettingsMenuList {menuList} appCheck={isApp} {onClick}/>
<SettingsContact {csState} {setCSState} {csList} {onClick}/>