<script lang="ts">
import { appCheck, openBrowser } from '$lib/util';
import { copyToClipboard, getVersion, launchSystemNotification, launchTel } from '$lib/_app_communication';
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

const onClickContact = () => {
  setCSState(true);
};

const onClickCall = () => {
  console.log('ddd');
  const win: any = window;
  if (win['flutter_inappwebview']) {
    return launchTel('02-6245-1111');
  }
  window.location.href = 'tel://02-6245-1111';
};

// TODO: brand, celbel 배너, 공지사항, FAQ, 약관, 개인정보 링크
const onClick = (category: string) => {
  switch (category) {
  case 'brand' : openBrowser('https://naver.com'); break;
  case 'celeb' : openBrowser('https://naver.com'); break;
  case '공지사항' : openBrowser('https://naver.com'); break;
  case 'FAQ' : openBrowser('https://naver.com'); break;
  case '문의하기' : onClickContact(); break;
  case '서비스 이용약관' : openBrowser('https://naver.com'); break;
  case '개인정보 처리방침' : openBrowser('https://naver.com'); break;
  case '고객센터 전화 문의' : onClickCall(); break;
  case '메세지 문의' : openBrowser('https://talk.naver.com/W4BGJY'); break;
  default: break;
  }
};

const bannerList = [
  {
    name: 'brand',
    image: 'images/Banner_Brand.png',
  },
  {
    name: 'celeb',
    image: 'images/Banner_Celeb.png',
  },
];

const menuList = [
  {
    depth1: '고객센터',
    depth2: [
      { title: '공지사항' },
      { title: 'FAQ' },
      { title: '문의하기' },
      { title: '서비스 이용약관' },
      { title: '개인정보 처리방침' }],
  },
  {
    depth1: '기타',
    depth2: [
      { title: '푸쉬 알림 설정' },
      { title: '버전 정보', desc: appVersion },
    ],
  },
];

const contactList = [
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

<SubHeaderContainer title="설정" share={false} />

<SettingsBanner {bannerList} {onClick}/>
<SettingsMenuList {menuList} appCheck={isApp} {onClick}/>
<SettingsContact {csState} {setCSState} {contactList} {onClick}/>