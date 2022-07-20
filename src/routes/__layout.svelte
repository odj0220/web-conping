<script lang="ts">
  import { page } from '$app/stores';
  import { beforeNavigate, afterNavigate } from '$app/navigation';

  beforeNavigate((navigation) => {
    const { to, from, cancel } = navigation;
    // window.location.href = to.pathname;
  });
</script>

<svelte:head>
  <link href="https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/static/woff2/SUIT.css" rel="stylesheet">
</svelte:head>

<slot />
