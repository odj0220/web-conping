<script lang="ts">
  import { graphqlApi } from '$lib/_api';
  
  import { goto } from '$app/navigation';

  import Title from '$component/Title.svelte';
  import PreviewVideos from '$component/PreviewVideos.svelte';

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
    const query = `{getProgramContentsByContentId(id:"${contentId}"){id title programId createDt episode description thumb program {id title thumbnail}}}`;
    const { data: { getProgramContentsByContentId } } = await graphqlApi(query);
    const contents: {data: any[]; end: boolean; cursor: string} = {
      data: getProgramContentsByContentId,
      end: true,
      cursor: '',
    };
    const programTitle = getProgramContentsByContentId[0].program.title;
    const programId = getProgramContentsByContentId[0].program.id;

    return {
      programTitle,
      programId,
      contents,
    };
  }

  function handleClickContents(id: string) {
    goto(`/contents/${id}`, {
      replaceState: false,
    });
  }
</script>

{#await loadAnotherContents()}
{:then {programTitle, programId, contents}}
  <section class="divider"></section>
  <section class="layout">
    <Title title={createTitle(programTitle)}/>
    <PreviewVideos
            contents={contents.data}
            end={contents.end}
            cursor={contents.cursor}
            onClickContents={handleClickContents}
    />
    <a class="link" href={'/programs/' + programId}>
        {programTitle} 시리즈 보러가기
    </a>
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

    .link {
      margin-top: 1.6rem;
      display: inline-block;
      width: 100%;
      @include body3-700;
      color: $text-white-f2;
      text-decoration: none;
      padding: 1.2rem 0;
      text-align: center;
      border: 0.1rem solid $text-white-f2;
      border-radius: 0.2rem;
      cursor: pointer;
    }
  }
</style>
