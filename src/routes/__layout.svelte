<script lang="ts">
  import { onMount } from 'svelte';
  import { onMessageFromApp, onAndroidExit, onInitialized } from '../lib/_app_communication';
  import { goto } from '$app/navigation';
  import { historyBack } from '../lib/utils/goto';

  onMount(() => {
    onInitialized(() => {
      const onDynamicLinkMessage = onMessageFromApp('onDynamicLinkMessage');
      onDynamicLinkMessage(({ type, id }: {type: string, id: string}) => {
        goto(`/${type}/${id}`);
      });

      const onAndroidBackKeyMessage = onMessageFromApp('onAndroidBackKeyMessage');
      onAndroidBackKeyMessage(() => {
        historyBack(-1, () => onAndroidExit());
      });
    });
  });
</script>

<svelte:head>
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css" />
  <meta property="og:type" content="contents">
  <meta property="og:title" content="콘핑(CONPING)">
  <meta property="og:description" content="재미로운 콘텐츠 놀이터">
  <meta property="og:image" content="https://gollala-frontend-web-wzsqjexeka-du.a.run.app/images/conping_wide.png">
</svelte:head>

<slot />
