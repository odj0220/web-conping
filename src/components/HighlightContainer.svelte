<script lang=ts>
  import { graphqlApi } from '../lib/_api';
  import PreviewVideos from './PreviewVideos.svelte';

  export let id;
  export let programTitle: string;

  const handleClickContents = (contentsId: string) => {
    window.location.href = `/contents/${contentsId}`;
  };

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
    <div class="spinner-wrapper">
        <div class="spinner"></div>
    </div>
{:then {contents, end, cursor}}
    {#if contents.length}
        <PreviewVideos
                contents={contents}
                end={end}
                cursor={cursor}
                onClick={handleClickContents}
        />
    {:else}
        <p class="empty-message">
            {programTitle} 하이라이트는 준비중입니다. <br/>
            조금만 기다려주세요 :)
        </p>
    {/if}
{:catch error}
    <p class="error-message">
        {programTitle} 하이라이트 데이터를 <br/>
        가져오는데 실패하였습니다.
    </p>
{/await}

<style lang="scss">
  .empty-message, .error-message {
    margin-top: 9.6rem;
    width: 100%;
    text-align: center;
    @include caption3;
    color: $disabled-8a;
  }

  .spinner-wrapper {
    margin-top: 9.6rem;
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

