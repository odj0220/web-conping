<script lang="ts">
  import type { IProduct } from 'src/global/types';

  import Thumbnail from './common/shared/Thumbnail.svelte';

  export let data: IProduct;

  const { name, price, image } = data;

</script>

<li class="product-grid-item">
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
