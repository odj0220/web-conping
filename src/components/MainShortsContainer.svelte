<script lang="ts">
  import Hscroller from './HorizontalScroller.svelte';
  import ShortVodList from './ShortVodList.svelte';
  import Title from './Title.svelte';
  import { onMount } from 'svelte';
  import { graphqlApi } from '$lib/_api_graphql';
  let contents: any[] = [];
  let title = [];
  onMount(async () => {
    getShorts();
  });
  async function getShorts() {
    const query = '{getMainShorts{title {text type} contents {thumb name videoId}}}';
    const result = await graphqlApi(query);
    console.log('result', result);
    title = result?.data?.getMainShorts?.title;
    contents = result?.data?.getMainShorts?.contents;
  }

</script>
<section class="section">
    <div class="title">
        <Title {title}></Title>
    </div>
    <Hscroller>
        <ShortVodList contents={contents}></ShortVodList>
    </Hscroller>
</section>
<style lang="scss">
  .section {
    margin-top: 5.6rem;
    .title {
      padding-left: 1.6rem;
    }
  }
</style>
