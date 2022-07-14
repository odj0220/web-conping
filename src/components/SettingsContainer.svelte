<script lang="ts">
import SettingsCS from './SettingsCS.svelte';
import SettingsMenuList from './SettingsMenuList.svelte';
import SubHeader from './SubHeader.svelte';

let csState = false;
const setCSState = (bool: boolean) => {
  csState = bool;
};

const onClickPush = () => {
  console.log('onClickPush');
};

const onClickNotice = () => {
  console.log('onClickNotice');
};

const onClicFAQ = () => {
  console.log('onClicFAQ');
};

const onClickCS = () => {
  setCSState(true);
};

const onClickPartnership = () => {
  console.log('onClickPartnership');
};

const onClickTerms = () => {
  console.log('onClickTerms');
};

const onClickPrivate = () => {
  console.log('onClickPrivate');
};

const onClickCScenter = () => {
  console.log('onClickCScenter');
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
      { title: 'FAQ', handler: onClicFAQ },
      { title: '문의하기', handler: onClickCS },
      { title: '브랜드/셀럽 제휴 문의', handler: onClickPartnership, link: 'cs@gollala.com' },
      { title: '서비스 이용약관', handler: onClickTerms },
      { title: '개인정보 처리방침', handler: onClickPrivate }],
  },
  {
    depth1: '기타',
    depth2: [
      { title: '버전 정보', desc: '최신 버전' },
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

</script>

<SubHeader title="설정" share={false} />
<SettingsMenuList {menuList} />
<SettingsCS {csState} {setCSState} {csList}/>