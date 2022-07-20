<script lang="ts">
    export let size = '';
    export let src = '';
    export let alt = '';
</script>

<div class="container" style="width: {size}; height: {size}">
    <img src={src}  alt={alt}/>
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
