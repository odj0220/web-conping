<script lang=ts>
  import contents from '../fixtures/contents';

  import ShortsGridVodList from './ShortsGridVodList.svelte';
  
  export let id;
  
  const handleClick = (id) => {
    console.log('TODO: click 이벤트', id);
  };
  </script>
  
  <ShortsGridVodList
    {contents}
    onClick={handleClick}
  />
  