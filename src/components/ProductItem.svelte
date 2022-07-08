<script lang="ts">
import Icon from './icons/Icon.svelte';

</script>

<li class="container">
    <div class="thumbnail">
        <img src="" alt="" />
    </div>
    <div class="contents">
        <div class="metadata">
            <div class="info">
                <h6 class="name">상품 이름 상품 이름 상품 이름 상품 이름 상품 이름 상품 이름 상품 이름 상품 이름 상품 이름 상품 이름 상품 이름 상품 이름</h6>
                <span class="price">1,000원</span>
            </div>
            <button class="btn btn-scrap">
                <Icon name="scrap" />
            </button>
        </div>
        <ul class="time-stamps">
            <li class="time-stamp">00:00</li>
            <li class="time-stamp">00:00</li>
            <li class="time-stamp">00:00</li>
            <li class="time-stamp">00:00</li>
        </ul>
    </div>
</li>

<style lang="scss">
@import "../styles/variables.scss";
@import "../styles/modules.scss";

.container {
    position: relative;
    display: flex;
    &:not(:last-child) {
        margin-bottom: 16px;
    }
}

.thumbnail {
    width: 8rem;
    height: 8rem;
    border-radius: 0.2rem;
    background-color: gray;
    margin-right: 12px;
    flex-shrink: 0;
}
.contents {
    .metadata {
        display: flex;
        .info {
            padding-top: 0.4rem;
            .name {
                @include caption2-400;
                @include ellipsis(1);
            }
            .price {
                @include body2-700;
                display: block;
                margin: 0.4rem 0 1.6rem;
            }
            .btn-scrap {
            
            }
        }
    }
}
.time-stamps {
    display: flex;
}
.time-stamp {
    @include caption3;
    padding: 0.2rem 0.6rem;
    background-color: $bg-gray-32;
    border-radius: 2px;  
    &:not(:last-child) {
        margin-right: 8px;
    }    
}       

</style>