<script lang="ts">
  import { convertDate, convertRegularDate } from '$lib/utils/common';

  import MetadataCelebs from './MetadataCelebs.svelte';

  import type { SvelteComponent } from 'svelte';
  import type { ICeleb, IContent, IMetadata, IProgram } from 'src/global/types';

  export let celebs:ICeleb[] = [];
  export let program:IProgram = {};
  export let content:IContent = {};
  export let onClickTitle: (id: number) => void;

  const isProgramDetail = Object.keys(program).length !== 0;
  const isContentsDetail = Object.keys(content).length !== 0;

  let data:IMetadata = {
    title: '',
    info: [],
  };
  let PastTimeDelta: SvelteComponent;
  let pastTime = 0;

  const setData = async () => {
    if (isProgramDetail) {
      data.title = program?.title || '';
      data.description = program?.description;

      if (program?.airingBeginAt && program.airingEndAt) {
        data.info = [...data.info, `${convertDate(program?.airingBeginAt)} ~ ${convertDate(program.airingEndAt)}`];
      }
      if (program.totalEpisode) {
        data.info = [...data.info, `${program.totalEpisode}부작`];
      }
      if (program?.regularAiringAt) {
        data.info = [...data.info, convertRegularDate(program?.regularAiringAt)];
      }
    }

    if (isContentsDetail) {
      data.title = content?.title || '';
      data.programTitle = content?.program?.title;

      if (content?.program?.title) {
        data.info = [...data.info, content?.program?.title];
      }
      if (content?.episode) {
        data.info = [...data.info, `${content?.episode}화`];
      }
      if (content?.views) {
        data.info = [...data.info, `조회수 ${content?.views}회`];
      }

      const module = await import('./PastTimeDelta.svelte');
      PastTimeDelta = module.default;
      pastTime = +content?.createDt;
    }

    return { data, PastTimeDelta, pastTime };
  };

</script>

<div class="container">
{#await setData()}
{:then {data, PastTimeDelta, pastTime}}

{#if isProgramDetail}
  <h4 class="title program">{data.title}</h4>
  <ul class="info">
    {#each data.info as el}
      <li class="info-item">{el}</li>
    {/each}
  </ul>
  <p class="description">{data.description}</p>
{/if}

{#if isContentsDetail}
  <ul class="info">
    {#each data.info as el}
      <li class="info-item">{el}</li>
    {/each}

    {#if PastTimeDelta}
      <svelte:component this={PastTimeDelta} pastTime={pastTime}></svelte:component>
    {/if}
  </ul>
  <h4 class="title content">{data.title}</h4>
{/if}

{/await}

{#if celebs.length}
  <MetadataCelebs {celebs} />
{/if}
</div>

<style lang="scss">
.container {
  padding: 1.6rem 1.6rem 4rem;
  background-color: $default-black;
  .content-name {
    @include body3-700;
    margin-top: 0.8rem;
  }
  .title {
    &.program {
      @include title1-700;
      margin-bottom: 0.8rem;
    }
    &.content {
      @include body3-700;
      margin: 8px 0 0;
    }
  }
  .info {
    @include body3-400;
    display: flex;
    color: $disabled-8a;
    .info-item {
      &:not(:last-child) {
        &:after {
          content: "・";
          width: 1.4rem;
          text-align: center;
        }
      }
    }
  }
  .description {
    @include caption1-400;
    margin: 24px 0 0;
    white-space: pre-line;
  }
}
</style>
