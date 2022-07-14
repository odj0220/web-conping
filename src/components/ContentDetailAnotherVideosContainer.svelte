<script lang="ts">
    import Title from './Title.svelte';
    import PreviewVideos from './PreviewVideos.svelte';
    import type { TitleElement } from '../global/types';
    import { graphqlApi } from '../lib/_api_graphql';
    import { onMount } from 'svelte';


    export let contentId: string;

    function createTitle(programName: string) {
      const title = [
        {
          text: `#${programName}`,
          type: 'primary-10',
          style: 'color: #FF70E2;',
        },
        {
          text: '다른 영상',
        },
      ];

      return title;
    }

    async function loadAnotherContents() {
      const query = `{getProgramContentsByContentId(id:"${contentId}"){id title programId createDt episode description thumb program {id title}}}`;
      const { data: { getProgramContentsByContentId } } = await graphqlApi(query);
      const contents: {data: any[]; end: boolean; cursor: string} = {
        data: getProgramContentsByContentId,
        end: true,
        cursor: '',
      };
      const programTitle = getProgramContentsByContentId[0].program.title;
      return {
        programTitle,
        contents,
      };
    }
</script>

{#await loadAnotherContents()}
{:then {programTitle, contents}}
    <section class="divider"></section>
    <section class="layout">
        <Title title={createTitle(programTitle)}/>
        <PreviewVideos contents={contents}/>
    </section>
{/await}



<style lang="scss">
  .divider {
    width: 100%;
    height: 0.8rem;
    background-color: $bg-black-21;
  }
  .layout {
    padding: 2.4rem 1.6rem 4rem 1.6rem;
  }
</style>
