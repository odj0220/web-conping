<script lang="ts">
    import TimeAgo from 'javascript-time-ago';
    import ko from 'javascript-time-ago/locale/ko';

    TimeAgo.addDefaultLocale(ko);

    export let pastTime = 0;
    export let style: any;
    export let className: string;
    const timeSystem = new TimeAgo('ko');

    $: timeDelta = timeSystem.format(pastTime);
</script>

<span {style} class={className}>
    {timeDelta}
</span>

<style lang="scss">

</style>
