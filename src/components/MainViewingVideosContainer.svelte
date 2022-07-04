<script lang="ts">
    import Hscroller from "./HorizontalScroller.svelte";
    import ViewingVodList from "./ViewingVodList.svelte";
    import {onMount} from "svelte";
    import Contents from "../fixtures/contents";

    let contents: any[] = Contents;

    onMount(() => {
        console.log(contents);
    })
</script>

<section>
    <header>
        <h1>시청중인 영상</h1>
    </header>

    <main>
        <Hscroller>
            <ViewingVodList contents={contents}></ViewingVodList>
        </Hscroller>
    </main>
</section>


<style lang="scss">

</style>
