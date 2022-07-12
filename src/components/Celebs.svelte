<script lang="ts">
import Celeb from './Celeb.svelte';

export let data: any[] = [];

console.log('celebs data', data);
</script>

<ul class="celebs">
    {#if data}
        {#each data as celeb}
            <Celeb {...celeb} />
        {/each}
    {/if}
</ul>