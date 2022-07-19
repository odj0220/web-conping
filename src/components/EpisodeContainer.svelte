<script lang=ts>
  import { graphqlApi } from '../lib/_api';
  import ImageListView from './ImageListView.svelte';
  import type { IContent } from 'src/global/types';

  export let id: string;
  export let programTitle: string;

  async function loadContents(): Promise<IContent[]> {
    const query = `{
       getContentsByProgramId(id:"${id}", type:FULL){
         id
         title
         videoId
         thumb
         episode
         program{
           title
         }
       }
    }`;

    const result = await graphqlApi(query);
    const contents = result.data.getContentsByProgramId;
    return contents;
  }

  const handleClickContents = (contentsId: string) => {
    window.location.href = `/contents/${contentsId}`;
  };
</script>

{#await loadContents()}
    <div class="spinner-wrapper">
        <div class="spinner"></div>
    </div>
{:then contents}
    {#if contents.length}
        <ImageListView
                {contents}
                onClick={handleClickContents}
        />
    {:else}
        <p class="empty-message">
            {programTitle} 에피소드는 준비중입니다.<br/>
            조금만 기다려주세요 :)
        </p>
    {/if}
{:catch error}
    <p class="error-message">
        {programTitle} 에피소드 데이터를 <br/>
        가져오는데 실패하였습니다.
    </p>
{/await}


<style lang="scss">
    .empty-message, .error-message {
      margin: 9.6rem 0;
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

