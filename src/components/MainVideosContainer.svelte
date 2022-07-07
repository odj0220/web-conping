<script lang="ts">
  import CenterSection from '../styles/CenterSection.svelte';
  import contents from '../fixtures/contents';
  import Videos from './Videos.svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    console.log(contents);
  });

  function handleClick() {
    console.log('click');
  }
</script>

<CenterSection>
    <Videos
            contents={contents}
            onClick={handleClick}
    />
</CenterSection>

<style lang="scss">

</style>
