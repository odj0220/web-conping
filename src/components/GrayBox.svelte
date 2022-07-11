<script lang="ts">
export let title: string;

</script>

<div class="container">
    <h4 class="title">{title}</h4>
    <slot></slot>
</div>

<style lang="scss">
@import  '../styles/variables.scss';

.container {
    border-radius: 4px;
    background-color: $bg-black-21;
    padding: 1.6rem 1.2rem;
}
.title {
    @include body1-700;
    margin-bottom: 16px;
}
</style>