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
    <h1>많이 본 하이라이트</h1>
</header>

<Hscroller>
    <HighLightList contents={contents}></HighLightList>
</Hscroller>

<style lang="scss">
    header {
     margin-bottom: 1.2rem;
    }
</style>
