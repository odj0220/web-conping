<script lang="ts">
    import { onMount } from 'svelte';


    export let pastTime = 0;
    export let style: any;
    export let className: string;
    let timeSystem: any = null;

    onMount(() => {
      // TimeAgo.addDefaultLocale(ko);
      // timeSystem = new TimeAgo('ko');
    });
</script>

<span {style} class={className}>
    어제전
</span>

<style lang="scss">

</style>
