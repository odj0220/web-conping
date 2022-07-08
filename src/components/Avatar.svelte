<script lang="ts">
    export let size: string;
    export let src: string;
</script>

<div class="container" style="width: {size}; height: {size}">
    <img src=""  alt="유저 프로필 이미지"/>
</div>

<style lang="scss">
    .container {
        border-radius: 50%;
        overflow: hidden;
        flex-shrink: 0;
        background-color: gray;
        img {
            width: 100%;
            height: 100%;
        }
    }
</style>