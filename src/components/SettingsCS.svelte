<script lang="ts">
import Icon from './icons/Icon.svelte';

export let csState: boolean;
export let setCSState: (bool: boolean) => void;
export let csList: any[] = [];

</script>

<div class="cs-container" class:on={csState}>
  <div class="layer" on:click="{() => setCSState(false)}"></div>
  <div class="inner">
    <h6 class="title">문의하기</h6>
    <p class="desc">궁금한 점이 있다면 편하게 연락주세요</p>
    <div class="buttons">
      {#each csList as csItem}
        <button on:click="{() => csItem.handler()}">
          <Icon name={csItem.icon} />
          <span class="text-big">{csItem.textBig}</span>
          <span class="text-small">{csItem.textSmall}</span>
        </button>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
@import "../styles/variables.scss";

.cs-container {
  .layer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(10, 10, 10, 0.8);
    z-index: 51;
    opacity: 0;
    visibility: hidden;
    transition: 0.3s;
  }
  .inner {
    position: fixed;
    left: 0;
    right: 0;
    bottom: -100%;
    width: 100%;
    border-top-left-radius: 1.6rem;
    border-top-right-radius: 1.6rem;
    background-color: $bg-black-21;
    padding: 4rem 2.4rem;
    text-align: center;
    box-sizing: border-box;
    z-index: 52;
    transition: 0.3s;
    .title {
      @include title1-700;
    }
    .desc {
      @include caption1-400;
      color: $disabled-8a;
      margin: 0.8rem 0 2.4rem;
    }
    .buttons {
      display: flex;
      align-items: center;
      button {
        flex: 1;
        height: 9.8rem;
        border-radius: 0.8rem;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: $default-black;
        &:first-child {
          margin-right: 1.2rem;
        }
        &:last-child {
          background-color: #F8DB40;
          color: #381E1F;
        }
        .text-big {
          margin: 0.6rem 0 0.2rem;
          @include caption1-700;
        }
        .text-small {
          @include caption3;
        }
      }
    }
  }
  &.on {
    .layer {
      opacity: 1;
      visibility: visible;
    }
    .inner {
      bottom: 0;
    }
  }
}
</style>