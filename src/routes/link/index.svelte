<script type="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    setTimeout(() => {
      location.href = 'intent://localhost:3000/link#Intent; scheme=mdlenstrend;package=com.wisefashion.trend; end;';
    }, 1000);
  });

  function goApp() {
    //location.href = 'intent://trend.mdlens.com/#Intent;package=com.wisefashion.trend;scheme=https;end';
    window.open('intent://asbc/#Intent;package=com.wisefashion.trend;scheme=mdlenstrend;end', '_self');
  }

  function ios() {
    window.open('https://apps.apple.com/kr/app/id1550069125');
  }

</script>

안녕하세요 반가워요
<button on:click={goApp} id="abc">gogo</button>
<button on:click={ios}>ios</button>
