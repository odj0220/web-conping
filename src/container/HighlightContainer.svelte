<script lang=ts>
  import { graphqlApi } from '../lib/_api';

  import { gotoContents } from '$lib/utils/goto';

  import PreviewVideos from '$component/PreviewVideos.svelte';
  import Spinner from '$component/common/shared/Spinner.svelte';
  import Container from '$component/common/layout/Container.svelte';
  import EmptyMessage from '$component/common/shared/EmptyMessage.svelte';

  export let id: string;
  export let category: string;

  async function loadHighlight() {
    const query = `{
        getContentsByProgramId(id:"${id}", type:HIGHLIGHT){
          id
          title
          programId
          videoId
          thumb
          createDt
          episode
          program{
            id
            title
            thumbnail
          }
        }
    }`;
    try {
      const result = await graphqlApi(query);

      const data:any = {
        contents: result.data.getContentsByProgramId,
        end: false,
        cursor: '',
      };
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
</script>

{#await loadHighlight()}
  <Spinner />
{:then {contents, end, cursor}}
  {#if contents.length}
    <Container margin="0">
      <PreviewVideos
        contents={contents}
        end={end}
        cursor={cursor}
        onClick={gotoContents}
      />
    </Container>
  {:else}
  <EmptyMessage text={`${category} 하이라이트`} />
  {/if}
{:catch error}
  <p class="error-message">
    {category} 하이라이트 데이터를 <br/>
    가져오는데 실패하였습니다.
  </p>
{/await}

<style lang="scss">
  .empty-message, .error-message {
    margin: 9.6rem 0;
    width: 100%;
    text-align: center;
    @include caption1-400;
    color: $disabled-8a;
  }

  .spinner-wrapper {
    margin: 9.6rem 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .spinner {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 50%;
      border: 0.4rem solid transparent;
      border-top-color: #ee2554;
      border-left-color: #ee2554;
      animation: spinner 1s ease infinite;
    }

    @keyframes spinner {
      from {transform: rotate(0deg); }
      to {transform: rotate(360deg);}
    }
  }
</style>
