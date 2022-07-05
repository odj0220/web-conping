<script lang="ts">
    import Hscroller from './HorizontalScroller.svelte';
    import ViewingVodList from './ViewingVodList.svelte';
    import Contents from '../fixtures/contents';

    let contents: any[] = Contents;
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
    section {
      background-color: #212121;
      border-radius: 0.4rem;
      margin: 0 1.6rem;
      padding: 1.6rem 1.2rem 2.6rem 1.2rem;

      header {
        margin-bottom: 1.6rem;
        h1 {
          font-size: 1.6rem;
          line-height: 1.997rem;
          font-weight: 700;
          color: #fff;
        }
      }
    }
</style>
