<script lang="ts">
  import type { IProduct } from 'src/global/types';
  
  import Thumbnail from './common/shared/Thumbnail.svelte';

  export let item:IProduct;

  const { name, brand, image, price } = item;
</script>

<li class="shop-item">
  <Thumbnail src={image} width="15.6rem" height="15.6rem" alt={name}/>
  <div class="info">
    <div class="info-top">
      <span class="brand">{brand}</span>
      <h6 class="name">{name}</h6>
      <span class="price">{price.toLocaleString()}원</span>
    </div>
    <div class="info-bottom">

    </div>
  </div>
</li>

<style lang="scss">
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
      }
      .info-bottom {
        padding-top: 1.2rem;

      }
    }
  }
</style>
