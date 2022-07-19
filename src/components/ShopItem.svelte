<script lang="ts">
import type { IProduct } from 'src/global/types';
import Thumbnail from './common/shared/Thumbnail.svelte';
import Icon from './icons/Icon.svelte';

export let item:IProduct;
const { name, brand, image, price } = item;
</script>

<li class="shop-item">
  <Thumbnail src={image} width="15.6rem" height="15.6rem"/>
  <div class="info">
    <div class="info-top">
      <span class="brand">{brand}</span>
      <h6 class="name">{name}</h6>
      <span class="price">{price.toLocaleString()}원</span>
      <span class="view-count">
        <Icon name="mypagex"/>
        00명이 구경했어요
      </span>
    </div>
    <div class="info-bottom">

    </div>
  </div>
</li>

<style lang="scss">
  @import "../styles/variables.scss";
  @import "../styles/modules.scss";

  .shop-item {
    display: flex;
    &:not(:last-child) {
      margin-bottom: 3.2rem;
    }
    .info {
      flex-grow: 1;
      margin-left: 1.6rem;
      .info-top {
        padding-bottom: 2.4rem;
        border-bottom: 1px solid $bg-gray-32;
        display: flex;
        flex-direction: column;
        .brand {
          @include caption3;
          color: $disabled-8a;
        }
        .name {
          @include caption2-400;
          @include ellipsis(2);
          margin-top: 0.4rem;
        }
        .price {
          @include body1-700;
          margin-top: 0.8rem;
        }
        .view-count {
          @include caption3;
          color: $disabled-8a;
          margin-top: 0.8rem;
          display: flex;
          align-items: center;
        }
      }
      .info-bottom {
        padding-top: 1.2rem;

      }
    }
  }
</style>
