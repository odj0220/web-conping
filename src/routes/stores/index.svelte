<script>
  import products from '../../fixtures/products'; //TODO: 목데이터
</script>

<h1>
  관련 상품
</h1>

<ul>
  {#each products as product }
    <li>
      <img src={product.imageUrl} alt={product.title}>
      {product.title}
    </li>
  {/each}
</ul>
