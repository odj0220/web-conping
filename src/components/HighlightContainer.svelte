<script lang=ts>
  import contents from '../fixtures/contents';
  
  import Videos from './Videos.svelte';
  
  export let id;
  
  const handleClick = (id) => {
    console.log('TODO: click 이벤트', id);
  };
  </script>
  
  <Videos
    {contents}
    onClick={handleClick}
  />
  
  
  <style>
  
  </style>
  