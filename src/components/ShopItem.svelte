<script lang="ts">
  import type { IProduct } from 'src/global/types';
  
  import Thumbnail from './common/shared/Thumbnail.svelte';
  import RelatedItems from './RelatedItems.svelte';

  export let item:IProduct;
  export let onClickProductItem: (url: string) => void;

  const {
    name,
    brand,
    image,
    price,
    storeUrl,
    relatedItems,
    badge,
  } = item;

  $:rank = badge?.rank;
  $:iconTheme = badge?.iconTheme;
</script>

<li class="shop-item">
  <Thumbnail
    src={image}
    alt={name}
    width="15.6rem"
    height="15.6rem"
    {rank}
    {iconTheme}
    targetUrl={storeUrl}
    on:go-link
  />

  <div class="info">
    <div
      class="info-top"
    >
      <span class="brand">{brand}</span>
      <h6 class="name">{name}</h6>
      <span class="price">{price.toLocaleString()}원</span>
    </div>

    {#if relatedItems?.length }
      <div class="info-bottom">
        <RelatedItems {relatedItems} />
      </div>
    {/if}
  </div>
</li>

<style lang="scss">
  .shop-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.6rem;
    height: 15.6rem;

    .info {
      flex: 1;
      display: flex;
      flex-direction: column;

      .info-top {
        flex-grow: 7;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.4rem;

        .brand {
          @include caption3;
          color: $disabled-8a;
        }
        .name {
          @include caption2-400;
          @include ellipsis(2);
        }
        .price {
          @include body1-700;
          margin-top: 0.4rem;
        }
      }
      .info-bottom {
        flex-grow: 10;
        display: flex;
        border-top: 1px solid $bg-gray-32;
      }
    }
  }
</style>
