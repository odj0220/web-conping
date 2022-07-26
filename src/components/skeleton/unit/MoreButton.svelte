<script lang="ts">
  import Rect from './Rect.svelte';

  export let bgColor = 'bg-black-21';
  export let margin = '1.2rem 0 0 0';

</script>

<Rect height="4rem" margin={margin} bgColor={bgColor} borderRadius="0.2rem" />