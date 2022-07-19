<script lang="ts">
  import '../styles/reset.scss';
  import { beforeNavigate } from '$app/navigation';

  beforeNavigate((navigation) => {
    const { to } = navigation;
    window.location.href = to.pathname;
  });
</script>

<slot />
