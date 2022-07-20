<script lang="ts">
  import '../styles/reset.scss';
  import { beforeNavigate } from '$app/navigation';

  beforeNavigate((navigation) => {
    const { to } = navigation;
    window.location.href = to.pathname;
  });
</script>

<svelte:head>
  <link href="https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/static/woff2/SUIT.css" rel="stylesheet">
</svelte:head>

<slot />
