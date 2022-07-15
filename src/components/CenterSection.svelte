<script lang="ts">
import Title from './Title.svelte';
export let title: string;
export let type: string;

</script>

<section class={`section ${type}`}>
    <h4 class="title">{title}</h4>
    <slot></slot>
</section>

<style lang="scss">
.section {

}
.title {
    @include body1-700;
    margin-bottom: 16px;
}
</style>
