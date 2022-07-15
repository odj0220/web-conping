<script lang=ts>
  import ShortsGridVodList from './ShortsGridVodList.svelte';
  import { graphqlApi } from '../lib/_api_graphql';
  import { goto } from '$app/navigation';
  import type { Content } from 'src/global/types';

  export let id;
  export let programTitle: string;

  const handleClickShorts = (id: string) => {
    goto(`/contents/${id}`);
  };

  async function loadData(): Promise<Content[]> {
    const query = `{
      getContentsByProgramId(id:"${id}", type:SHORTS){
        id
        title
        videoId
        thumb
        program {title}
      }
    }`;

    try {
      const result = await graphqlApi(query);
      const contents = result.data.getContentsByProgramId;
      return contents;
    } catch (error) {
      console.log(error);
      throw Error;
    }
  }
</script>

{#await loadData()}
  <div class="spinner-wrapper">
    <div class="spinner"></div>
  </div>
{:then contents}
  {#if contents.length}
    <ShortsGridVodList
            {contents}
            onClick={handleClickShorts}
    />
    {:else}
    <p class="empty-message">
      {programTitle} 쇼츠는 준비중입니다. <br/>
      조금만 기다려주세요 :)
    </p>
  {/if}
{:catch error}
  <p class="error-message">
    {programTitle} 쇼츠 데이터를 <br/>
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
