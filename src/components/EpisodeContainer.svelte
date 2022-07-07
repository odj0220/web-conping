<script lang=ts>
import contents from '../fixtures/contents';

import GridViewList from './GridViewList.svelte';

export let id; //TODO: data get

const handleClick = (clickedId: string) => {
  console.log('TODO: click 이벤트', clickedId);
};
</script>

<GridViewList
  {contents}
  onClick={handleClick}
/>


<style>

</style>
