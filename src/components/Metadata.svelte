<script lang="ts">
import { SvelteComponent } from 'svelte';

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
      regularAiringAt?: number;
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

const getInformation = async () => {
  let result = '';
  if (isContentDetail) {
    const { contentDetail: { info: { programTitle, episode, createDt, view } } } = option;

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
    const { programDetail: { info: { airingBeginAt, airingEndAt, totalEpisode, regularAiringAt } } } = option;

    if (airingBeginAt) {
      const start = convertDate(airingBeginAt) + ' ~';
      let end = '';
      if (airingEndAt) {
        end = convertDate(airingEndAt);
      }

      information = [...information, start + end];
    }

    if (totalEpisode) {
      information = [...information, `${totalEpisode}부작`];
    }

    if (regularAiringAt) {
      const regularTime = convertRegularDate(regularAiringAt);
      information = [...information, regularTime];
    }

    result = information.join(' ・ ');

    return result;
  }

  return '';
};

const convertDate = (time: number) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}.${month < 10 ? `0${month}` : month}.${day < 10 ? `0${day}` : day}`;
};

const convertRegularDate = (time:number) => {
  const date = new Date(time);
  const day = getDay(date.getDay());
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const division = hours > 12 ? '오후' : '오전';
  return `(${day}) ${division} ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
};

const getDay = (time: number) => {
  const DAYS = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WENSDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
  };

  switch (time) {
  case DAYS.SUNDAY:
    return '일';
  case DAYS.MONDAY:
    return '월';
  case DAYS.TUESDAY:
    return '화';
  case DAYS.WENSDAY:
    return '수';
  case DAYS.THURSDAY:
    return '목';
  case DAYS.FRIDAY:
    return '금';
  case DAYS.SATURDAY:
    return '토';
  default:
    return '알 수 없음';
  }
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
    {/if}


    {#if isProgramDetail}
        {#if option['programDetail']['title']}
            <h4 class="name">
                {option['programDetail']['title']}
            </h4>
        {/if}
        {#await getInformation()}
        {:then text}
            <div class="info">
                {text}
            </div>
        {/await}
        {#if option['programDetail']['description']}
            <div class="description">
                {option['programDetail']['description']}
            </div>
        {/if}
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
        margin: 24px 0 0;
        white-space: pre-line;
      }

      .profile-list {
        @include horizontalScroll(2rem, 1.2rem);
        .profile-item {
          a {
            display: flex;
            flex-direction: column;
            align-items: center;
            @include caption3;
            text-decoration: none;

            .profile-name {
              display: block;
              margin: 0.4rem 0 0.2rem;
              color: $all-white;
              cursor: pointer;
            }

            .profile-role {
              color: $disabled-8a;
            }
          }
        }
      }
    }
</style>
