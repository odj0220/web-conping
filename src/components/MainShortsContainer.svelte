<script lang="ts">
    import Hscroller from './HorizontalScroller.svelte';
    import ShortVodList from './ShortVodList.svelte';
    import Title from './Title.svelte';
    import { onMount } from 'svelte';
    import { graphqlApi } from '$lib/_api_graphql';

    let contents: any[] = [];
    let title = [];

    onMount(() => {
      getShorts();
    });

    function getShorts() {
      const query = '{getMainShorts{title {text type} contents {thumb name videoId}}}';
      graphqlApi(query).then(response => {
        const { title: titleArray, contents: contentList } = response.data.getMainShorts;
        title = titleArray;
        contents = contentList;
      });
    }

</script>

<header>
    <Title {title}></Title>
</header>

<main>
    <Hscroller>
        <ShortVodList contents={contents}></ShortVodList>
    </Hscroller>
</main>

<style lang="scss">
    header {
      margin-bottom: 1.2rem;
      padding: 0 1.6rem;
      h1 {
        font-size: 1.6rem;
        line-height: 1.997rem;
        font-weight: bold;
        letter-spacing: -0.01rem;
      }
    }

    main {
      padding: 0 1.6rem;
      margin-bottom: 4rem;
    }
</style>
