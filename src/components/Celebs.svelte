<script lang="ts">
  import Celeb from './Celeb.svelte';
  
  import type { ICeleb } from 'src/global/types';

  export let data: ICeleb[] = [];
  export let onClick : (id: string) => void;

</script>

<ul class="celebs">
  {#each data as celeb}
    <Celeb {celeb} onClick={onClick} />
  {/each}
</ul>
