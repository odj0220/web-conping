<script lang="ts">
import SubHeader from './SubHeader.svelte';

const menu = [
  {
    depth1: '푸쉬 알림',
    depth2: ['푸쉬 알림 설정']
  },
  {
    depth1: '고객센터',
    depth2: ['공지사항', 'FAQ','문의하기','브랜드/셀럽 제휴 문의','서비스 이용약관', '서비스 이용약관']
  },
  {
    depth1: '기타',
    depth2: ['버전 정보']
  },
];

</script>

<SubHeader title="설정" share={false,} />