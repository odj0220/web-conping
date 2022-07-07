<script lang=ts>
import { onMount } from 'svelte';

import Icon from './icons/Icon.svelte';

export let id: string;

onMount(async () => {
  const body = {
    query: 'programs',
  };
  fetch('/api/graphql', {
    method: 'POST',
    body: JSON.stringify(body),
  }).then(response => {
    return response.json();
  }).then(response => {
    console.log(response);
  });
});

const handler = () => {
  console.log('test handler');
};

const BUTTONS = [
  {
    name: '좋아요',
    icon: 'like',
    handler: handler,
  },
  {
    name: '찜하기',
    icon: 'scrap',
    handler: handler,
  },
  {
    name: '공유하기',
    icon: 'share',
    handler: handler,
  },
];
</script>

<div class="container">
  <div class="visual">
    <img src="" alt=""/>
  </div>
  <div class="metadata">
    <h4 class="title">랜선뷰티</h4>
    <span class="info">2022.05.04~2022.06.22</span>
    <p class="desc">언택트 시대, 온라인 중심의 트렌드 세터 뷰티 프로그램. 스타의 파우치부터 글로벌인플루언서와 한국인 인플루언서들이 전하는 뷰티 트렌드 프로그램</p>
  </div>  
  <div class="buttons">
    {#each BUTTONS as button}
      <button class="button" on:click={button.handler}>
        <Icon name={button.icon} />
        <span class="button-name">{button.name}</span>
      </button>
    {/each}
  </div>
</div>

<style lang="scss">
  @import '../styles/variables.scss';

  .container {
    padding: 8px 16px 24px;
    .visual {
      border-radius: 4px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .metadata {
      .title {
        @include title1-700;
        margin: 24px 0 8px;
      }
      .info {
        @include body3-400;
        display: block;
        color: $disabled-8a;
      }
      .desc {
        @include caption1-400;
        margin: 24px 0;
      }

    }
    .buttons {
      padding: 0 4px;
      display: flex;
      .button {
        color: #f2f2f2;
        display: flex;
        flex-direction: column;
        align-items: center;
        &:not(:last-child) {
          margin-right: 32px;
        }
        .button-name {
          margin-top: 4px;
          @include caption1-400;
        }
      }
    }  
  }
  
</style>