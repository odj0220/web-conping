<script lang="ts">
    import Hscroller from './HorizontalScroller.svelte';
    import HighLightList from "./HighLightVodList.svelte";
    import Contents from '../fixtures/contents';
    import {onMount} from 'svelte';

    let contents: any[] = [];

    onMount(() => {
        getShorts();
    });

    function getShorts() {
     /*
     * To do: get Short vods from graphql api
     * */
        contents = Contents;
    }

</script>

<header>
    <h1>많이 본 쇼츠</h1>
</header>

<main>
    <Hscroller>
        <HighLightList contents={contents}></HighLightList>
    </Hscroller>
</main>

<style lang="scss">
    header {
      margin-bottom: 1.2rem;
      padding: 0 1.6rem;
      h1 {
        font-size: 2.8rem;
        font-weight: bold;
      }
    }

    main {
      padding: 0 1.6rem;
    }
</style>
