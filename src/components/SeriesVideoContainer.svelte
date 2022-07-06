<script lang="ts">
import CenterSection from '../styles/CenterSection.svelte';

import contents from '../fixtures/contents'; //TODO: 목데이터

import GridViewList from './GridViewList.svelte';
import Button from './Button.svelte';
import Title from './Title.svelte';

const handleClickItem = (id: string) => {
  console.log('TODO: click 이벤트 : ', id);
};

const handleClickButton = () => {
  console.log('TODO: click 이벤트 : ');
};

const title = [
  {
    text: '뷰티 꿀팁 가득한',
  },
  {
    text: '#랜선뷰티',
    type: 'primary-20',
  },
  {
    text: '모아보기',
  },
];

</script>

<CenterSection>
  <Title {title} />
  
  <GridViewList
    {contents}
    onClick={handleClickItem}
  />

  <Button
    buttonName={'랜선뷰티 시리즈 보러가기'}
    onClick={handleClickButton}
  />
</CenterSection>
