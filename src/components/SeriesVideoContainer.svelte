<script>
import CenterSection from '../styles/CenterSection.svelte';

import contents from '../fixtures/contents'; //TODO: 목데이터

import GridViewList from './GridViewList.svelte';
import Button from './Button.svelte';
import Title from './Title.svelte';

const handleClickItem = (id) => {
  console.log('TODO: click 이벤트 : ', id);
};

const handleClickButton = () => {
  console.log('TODO: click 이벤트 : ');
};

</script>

<CenterSection>
  <Title title={'뷰티 꿀팁 가득한 #랜선뷰티 모아보기'} />
  
  <GridViewList
    {contents}
    onClick={handleClickItem}
  />

  <Button
    buttonName={'랜선뷰티 시리즈 보러가기'}
    onClick={handleClickButton}
  />
</CenterSection>
