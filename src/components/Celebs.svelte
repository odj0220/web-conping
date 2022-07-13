<script lang="ts">
  import type { ICeleb } from 'src/global/types';
  
  import Celeb from './Celeb.svelte';

  export let celebs: ICeleb[] = [];
</script>

<ul class="celebs">
  {#each celebs as celeb}
    <Celeb {celeb} />
  {/each}
</ul>