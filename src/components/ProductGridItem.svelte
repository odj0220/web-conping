<script lang="ts">
  import type { IProduct } from 'src/global/types';

  import Thumbnail from './common/shared/Thumbnail.svelte';

  export let data: IProduct;

  const { name, price, image } = data;

</script>

<li class="product-grid-item">
  <Thumbnail src={image} alt={name} />
  <div class="info">
    <h6 class="name">{name}</h6>
    <span class="price">{price}</span>
  </div>
</li>

<style lang="scss">
    .product-grid-item {
      .info {
        .name {
          @include caption2-700;
          margin-bottom: 0.4rem;
        }
        .price {
          @include body2-700;
          
        }
      }  
    }
    
</style>
