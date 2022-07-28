<script lang="ts">
  import type { IProduct } from 'src/global/types';

  import Thumbnail from './common/shared/Thumbnail.svelte';
  import RelatedItems from './RelatedItems.svelte';

  export let item:IProduct;
  export let onClickProductItem: (url: string) => void;
  export let onClickRelatedItem: (url: string) => void;

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

<li class="shop-item" on:click="{() => onClickProductItem(storeUrl)}">
  <Thumbnail
    src={image}
    alt={name}
    width="15.6rem"
    height="15.6rem"
    {rank}
    {iconTheme}
  />

  <div class="info">
    <div
      class="info-top"
      on:click={() => onClickProductItem(storeUrl)}
    >
      <span class="brand">{brand}</span>
      <h6 class="name">{name}</h6>
      <span class="price">{price.toLocaleString()}원</span>
    </div>

    {#if relatedItems?.length }
      <div class="info-bottom">
        <RelatedItems {relatedItems} {onClickRelatedItem}/>
      </div>
    {/if}
  </div>
</li>

<style lang="scss">
  .shop-item {
    display: flex;
    gap: 1.6rem;
    .info {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      .info-top {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-bottom: 2.4rem;
        .brand {
          @include caption3;
          color: $disabled-8a;
          margin-bottom: 0.4rem;
        }
        .name {
          @include caption2-400;
          @include ellipsis(2);
          margin-bottom: 0.8rem;
        }
        .price {
          @include body1-700;
        }
      }
      .info-bottom {
        border-top: 1px solid $bg-gray-32;
        padding-top: 1.2rem;
        width: 100%;
      }
    }
  }
</style>
