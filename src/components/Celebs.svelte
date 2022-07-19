<script lang="ts">
import type { ICeleb } from 'src/global/types';
import Celeb from './Celeb.svelte';

export let celebs: ICeleb[] = [];
export let onClick : (id: string) => void;
console.log('celebs', celebs);
</script>

<ul class="celebs">
  {#each celebs as celeb}
    <Celeb {celeb} onClick={onClick} />
  {/each}
</ul>