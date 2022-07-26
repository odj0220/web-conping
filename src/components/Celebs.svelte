<script lang="ts">
  import Celeb from './Celeb.svelte';

  import type { ICeleb } from 'src/global/types';

  export let celebs: ICeleb[] = [];
  export let onClick : (id: string) => void;

</script>

<ul class="celebs">
  {#each celebs as celeb}
    <Celeb {celeb} onClick={onClick} />
  {/each}
</ul>
