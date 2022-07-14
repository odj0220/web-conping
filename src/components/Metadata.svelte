<script lang="ts">
  import { onMount, SvelteComponent } from 'svelte';
import Avatar from './Avatar.svelte';
import GrayBox from './CenterSection.svelte';
import Hscroller from './HorizontalScroller.svelte';

// export let name: string;
// export let title: string;
// export let description: string;
// export let airingBeginAt: number;
// export let airingEndAt: number;
// export let airingAt: number;
// export let celebs: any;

let PastTimeDelta: SvelteComponent;

export let option: {
    programDetail?: {
        title?: string;
        description?: string;
        celebs?: any[];
        info?: {
          airingBeginAt?: number;
          airingEndAt?: number;
          totalEpisode?: number;
          airingAt?: number;
        };
    }

    contentDetail?: {
        title?: string;
        celebs?: any[];
        info?: {
          programTitle?: string;
          episode?: number;
          view: number;
          createDt?: string;
        };
    }
};

let information = [];
let pastTime: number;

$: isContentDetail = !!option['contentDetail'];
$: isProgramDetail = !!option['programDetail'];

onMount(async () => {
    getInformation();
    setTimeout(() => {
      console.log(option['contentDetail']);
    }, 1000);
});

const getInformation = async () => {
    if (isContentDetail) {
      const { contentDetail: { info: { programTitle, episode, createDt, view } } } = option;
      let result = '';

      if (programTitle) {
        information = [programTitle];
      }

      if (episode) {
        information = [...information, `${episode}화`];
      }

      if (view) {
        information = [...information, `조회수 ${view}회`];
      }

      if (createDt) {
        const module = await import('./PastTimeDelta.svelte');
        PastTimeDelta = module.default;
        pastTime = +createDt;
      }

      result = information.join(' ・ ') + `${createDt ? ' ・ ' : ''}`;
  
      return result;
    }

    if (isProgramDetail) {
      return '프로그램 정보';
    }

    return '';
};
</script>

<div class="container">
  {#if isContentDetail}
      {#await getInformation()}
      {:then text}
          <div class="info">
              {#if information.length > 0}
                  {text}
                  {#if PastTimeDelta}
                      <svelte:component this={PastTimeDelta} pastTime={pastTime}></svelte:component>
                  {/if}
              {/if}
          </div>
      {/await}

      {#if option.contentDetail.title}
          <h4 class="content-name">{option.contentDetail.title}</h4>
      {/if}

      {#if option.contentDetail?.celebs.length}
          <section class="celob-wrapper">
              <GrayBox title="출연 셀럽">
                  <Hscroller>
                      <ul class="profile-list">
                          {#each option.contentDetail.celebs as celeb (celeb.id)}
                              <li class="profile-item">
                                  <Avatar size="8rem" src={celeb.thumbnail} alt="{celeb.name + '의 사진'}"/>
                                  <span class="profile-name">{celeb.name}</span>
                                  <span class="profile-role">{celeb.categories[0]}</span>
                              </li>
                          {/each}
                      </ul>
                  </Hscroller>
              </GrayBox>
          </section>
      {/if}
  {/if}
</div>
<!--<section class="container">-->
<!--    {#if programTitle}-->
<!--        <h4 class="name">{programTitle}</h4>-->
<!--    {/if}-->
<!--    <span class="info">-->
<!--      {#if airingBeginAt && airingEndAt}-->
<!--          {airingBeginAt}~{airingEndAt} &middot-->
<!--      {/if}-->
<!--      8부작 &middot-->
<!--      {airingAt}-->
<!--    </span>-->

<!--    {#if contentTitle}-->
<!--        <h5 class="title">{contentTitle}</h5>-->
<!--    {/if}-->

<!--    {#if description}-->
<!--        <div class="description">{description}</div>-->
<!--    {/if}-->

<!--    {#if celebs?.length}-->
<!--      <GrayBox title="골라라 셀럽">-->
<!--        <Hscroller>-->
<!--          <ul class="profile-list">-->
<!--            {#each celebs as celeb}-->
<!--              <li class="profile-item">-->
<!--                <Avatar size="80px" src="{celeb.thumbnail}" />-->
<!--                <span class="profile-name">{celeb.name}</span>-->
<!--              </li>-->
<!--            {/each}-->
<!--          </ul>-->
<!--        </Hscroller>-->
<!--      </GrayBox>-->
<!--    {/if}-->
<!--  </section>  -->


  <style lang="scss">
    .container {
      padding: 1.6rem;
      .content-name {
        @include body3-700;
        margin-top: 0.8rem;
      }
      .name {
        @include title1-700;
        margin-bottom: 0.8rem;
      }
      .title {
        @include body3-700;
        margin: 8px 0 24px;
      }
      .info {
        @include body3-400;
        display: block;
        color: $disabled-8a;
      }
      .description {
        @include caption1-400;
        margin: 24px 0;
      }

      .celob-wrapper {
        padding: 1.6rem 1.2rem;
        background-color: $bg-black-21;
        border-radius: 0.4rem;
        margin-top: 2.4rem;

        .profile-list {
          display: flex;
          .profile-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            @include caption3;

            &:not(:last-child) {
              margin-right: 12px;
            }

            .profile-name {
              display: block;
              margin: 0.4rem 0 0.2rem;
            }
            .profile-role {
              color: $disabled-8a;
            }
          }
        }
      }
    }
  </style>
