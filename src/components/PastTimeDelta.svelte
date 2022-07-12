<script lang="ts">
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    import updateLocale from 'dayjs/plugin/updateLocale';
    import { onMount } from 'svelte';
    import 'dayjs/locale/ko';


    export let pastTime = 0;
    export let style: any;
    export let className: string;
    let diffTime = '';

    onMount(() => {
      loadDiffTimeFromNow();
    });

    function loadDiffTimeFromNow() {
      dayjs.extend(relativeTime);
      dayjs.extend(updateLocale);
      dayjs.updateLocale('ko', {
        relativeTime: {
          future: 'in %s',
          past: '%s ago',
          s: '방금',
          m: '1분 전',
          mm: '%d분 전',
          h: '1시간 전',
          hh: '%d시간 전',
          d: '어제',
          dd: '%d일 전',
          M: '1달 전',
          MM: '%d달 전',
          y: '일년 전',
          yy: '%d년 전',
        },
      });
      dayjs.locale('ko');
      diffTime = dayjs().from(dayjs(pastTime), true);
    }
</script>

<span {style} class={className}>
    {diffTime}
</span>

<style lang="scss">

</style>
