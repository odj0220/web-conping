<script lang="ts">
import { appCheck, openBrowser } from '$lib/util';
import { copyToClipboard, getVersion, launchSystemNotification, launchTel } from '$lib/_app_communication';
import { onMount } from 'svelte';
import SettingsCS from './SettingsCS.svelte';
import SettingsMenuList from './SettingsMenuList.svelte';
import SubHeaderContainer from './SubHeaderContainer.svelte';

let isApp: boolean;
let appVersion = '알 수 없음';
let csState = false;
const setCSState = (bool: boolean) => {
  csState = bool;
};

const onClickPush = () => {
  launchSystemNotification();
};

const onClickNotice = () => {
  openBrowser('https://naver.com');
};

const onClickFAQ = () => {
  openBrowser('https://naver.com');
};

const onClickCS = () => {
  setCSState(true);
};

const onClickPartnership = () => {
  copyToClipboard('cs@gollala.com');
  console.log('ddddd');
};

const onClickTerms = () => {
  openBrowser('https://naver.com');
};

const onClickPrivate = () => {
  openBrowser('https://naver.com');
};

const onClickCScenter = () => {
  const win: any = window;
  if (win['flutter_inappwebview']) {
    return launchTel('02-6245-1111');
  }
  window.location.href = 'tel://02-6245-1111';
};

const onClickCSKakao = () => {
  console.log('onClickCSKakao');
};


const menuList = [
  {
    depth1: '푸쉬 알림',
    depth2: [
      { title: '푸쉬 알림 설정', handler: onClickPush },
    ],
  },
  {
    depth1: '고객센터',
    depth2: [
      { title: '공지사항', handler: onClickNotice },
      { title: 'FAQ', handler: onClickFAQ },
      { title: '문의하기', handler: onClickCS },
      { title: '브랜드/셀럽 제휴 문의', linkHandler: onClickPartnership, link: 'cs@gollala.com' },
      { title: '서비스 이용약관', handler: onClickTerms },
      { title: '개인정보 처리방침', handler: onClickPrivate }],
  },
  {
    depth1: '기타',
    depth2: [
      { title: '버전 정보', desc: appVersion },
    ],
  },
];

const csList = [
  {
    textBig: '02-6245-1111',
    textSmall: '고객센터 전화 문의',
    handler: onClickCScenter,
    icon: 'call',
  },
  {
    textBig: '골라라 플러스친구',
    textSmall: '카카오톡 문의',
    handler: onClickCSKakao,
    icon: 'kakao',
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
<SettingsMenuList {menuList} appCheck={isApp}/>
<SettingsCS {csState} {setCSState} {csList} />