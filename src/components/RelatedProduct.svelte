<script lang="ts">
import IconArrow from './icons/IconArrow.svelte';
import ProductItem from './ProductItem.svelte';

export let moreButton: false;
export let data: any[] = [];
export let timelineButtonVisible = false;

let list: any[] = [];
let displayMore = true;

$: if (data.length > 5) {
  list = [...data].slice(0, 5);
} else {
  list = [...data];
}

const onClickMore = () => {
  displayMore = false;
  list = [...data];
};

</script>

<section class="container">
    <h4 class="title">관련 상품</h4>
    <div class="contents">
        <ul class="list">
            {#each list as el}
                <ProductItem {...el} {timelineButtonVisible} on:set-video-current-time/>
            {/each}
        </ul>
        {#if data?.length > 5 && displayMore && moreButton}
            <button class="more" on:click={onClickMore}>
                <span class="value">관련 상품 더보기</span>
                <IconArrow name="small-down" />
            </button>
        {/if}

    </div>
</section>

<style lang="scss">
    .container {
        position: relative;
        padding: 0 1.6rem 2.4rem;
        .title {
            @include body1-700;
            margin-bottom: 12px;
        }
        .contents {
            position: relative;
        }
        .more {
            position: absolute;
            bottom: -0.2rem;
            left: -1.2rem;
            right: -1.2rem;
            background-color: $default-black;
            padding: 1.6rem 0 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            .value {
                @include caption1-700;
                color: $text-white-f2;
                margin-right: 4px;
            }
            &:before {
                content: "";
                display: block;
                position: absolute;
                background: linear-gradient(180deg, rgba(10, 10, 10, 0.6) 0%, #0A0A0A 100%);
                height: 4.2rem;
                left: -1.2rem;
                right: -1.2rem;
                bottom: 4rem;
            }
        }
    }
</style>
