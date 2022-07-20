<script>
import { page } from '$app/stores';
import CelebsDetailContainer from '$component/CelebsDetailContainer.svelte';

const id = $page.params.id;

</script>

<CelebsDetailContainer {id} />