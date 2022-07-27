<script lang="ts">
  import { onMount } from 'svelte';
  import { onMessageFromApp } from '../lib/_app_communication';
  import { goPath } from '../lib/utils/goto';

  onMount(() => {
    const onDynamicLinkMessage = onMessageFromApp('onDynamicLinkMessage');
    onDynamicLinkMessage(({ type, id }: {type: string, id: string}) => {
      goPath(`/${type}/${id}`);
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
