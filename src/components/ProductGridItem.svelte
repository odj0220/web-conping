<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { IProduct } from 'src/global/types';

  import Thumbnail from './common/shared/Thumbnail.svelte';

  export let data: IProduct;

  const { name, price, image, storeUrl } = data;
  const dispatch = createEventDispatcher<{'go-link': {targetUrl: string}}>();

  function goProductPage() {
    dispatch('go-link', {
      targetUrl: storeUrl,
    });
  }
</script>

<li class="product-grid-item" on:click={goProductPage}>
  <Thumbnail src={image} alt={name} width="100%" height="100%"/>
  <div class="info">
    <h6 class="name">{name}</h6>
    <span class="price">{price.toLocaleString()}</span>
  </div>
</li>

<style lang="scss">
    .product-grid-item {
      .info {
        margin-top: 0.8rem;
        .name {
          @include caption2-700;
          @include ellipsis(2);
          margin-bottom: 0.4rem;
        }
        .price {
          @include body2-700;
          
        }
      }  
    }
</style>
