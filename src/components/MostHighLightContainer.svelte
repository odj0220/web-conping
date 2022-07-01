<script lang="ts">
    import Hscroller from './Hscroller.svelte';
    import ShortList from "./ShortList.svelte";

</script>

<header>
    <h1>많이 본 하이라이트</h1>
</header>

<Hscroller>
    <ShortList></ShortList>
</Hscroller>

<style lang="scss">
    header {
     margin-bottom: 1.2rem;
    }
</style>
