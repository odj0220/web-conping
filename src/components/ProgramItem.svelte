<script lang="ts">
export let name: string;
export let bannerImg: string;
</script>

<li class="item">
    <div class="bannerImg">
        <img src={bannerImg} alt={name} />
    </div>
    <h6 class="name">{name}</h6>
</li>

<style lang="scss">
    @import "../styles/variables.scss";

    .item {
        flex-shrink: 0;
        width: 144px;
        &:not(:last-child) {
            margin-right: 12px;
        }
        .bannerImg {
            border-radius: 0.4rem;
            overflow: hidden;
            img {
                width: 100%;
                height: 203px;
                object-fit: cover;
            }
        }
        .name {
            @include caption1-400;
            margin-top: 8px;
        }
    }

</style>