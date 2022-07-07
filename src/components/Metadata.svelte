<script lang="ts">
import Icon from './icons/Icon.svelte';

export let name: string;
export let description: string;

const onClickLike = () => {
  console.log('like handler');
};

const onClickScrap = () => {
  console.log('scrap handler');
};

const onClickShare = () => {
  console.log('share handler');
};

const BUTTONS = [
  {
    name: '좋아요',
    icon: 'like',
    handler: onClickLike,
  },
  {
    name: '찜하기',
    icon: 'scrap',
    handler: onClickScrap,
  },
  {
    name: '공유하기',
    icon: 'share',
    handler: onClickShare,
  },
];
</script>

<div class="metadata">
    <h4 class="title">{name}</h4>
    <span class="info">2022.05.04~2022.06.22 &middot 8부작 &middot (수) 오후 08:00</span>
    <div class="desc">
        <p class="desc-value">{description}</p>
        <span class="desc-arrow">
            <Icon name="dropdown-small-white-down" />
        </span>
    </div>
  </div>  
  <div class="buttons">
    {#each BUTTONS as button}
      <button class="button" on:click={button.handler}>
        <Icon name={button.icon} />
        <span class="button-name">{button.name}</span>
      </button>
    {/each}
  </div>

  <style lang="scss">
    @import '../styles/variables.scss';

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
        display: flex;
        .desc-value {
            flex-grow: 1;
            margin-right: 12px;
        }
        .desc-arrow {

        }
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
  </style>