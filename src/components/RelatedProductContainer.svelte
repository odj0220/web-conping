<script lang="ts">
import ProductItem from './ProductItem.svelte';
export let data: any[] = [];
console.log('product data', data);
</script>

<section class="container">
    <h4 class="title">관련 상품</h4>
    <ul class="list">
        {#each data as el}
            <ProductItem {...el}/>
        {/each}
    </ul>
</section>

<style lang="scss">
    @import "../styles/variables.scss";

    .container {
        padding: 2.4rem 1.6rem;
        .title {
            @include body1-700;
            margin-bottom: 12px;
        }
    }
</style>