<script lang="ts">
    import Hscroller from './HorizontalScroller.svelte';
    import ViewingVodList from './ViewingVodList.svelte';
    import { onMount } from 'svelte';
    import { getList } from '$lib/_continue_watching';

    let contents = [];

    onMount(async () => {
      contents = await getList();
    });

</script>

{#if contents.length > 0}
  <section>
    <h3 class="title">시청중인 영상</h3>
    <Hscroller>
        <ViewingVodList contents={contents}></ViewingVodList>
    </Hscroller>
  </section>
{/if}


<style lang="scss">
  @import "../styles/variables.scss";
  
    section {
      background-color: #212121;
      border-radius: 0.4rem;
      margin: 2rem 1.6rem 0 1.6rem;
      padding: 1.6rem 0 2.6rem;
      .title {
        @include body1-700;
        color: #fff;
        padding-left: 1.2rem;
        margin-bottom: 1.6rem;
      }
    }
</style>
