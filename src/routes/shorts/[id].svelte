<script>
    import { page } from '$app/stores';
    import ShortsDetailContainer from '$component/ShortsDetailContainer.svelte';

    const id = $page.params.id;
</script>
    
<ShortsDetailContainer {id} />

    
    
    