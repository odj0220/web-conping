<script lang="ts">
import { page } from '$app/stores';
import ProgramDetailContainer from '$component/ProgramDetailContainer.svelte';

const id = $page.params.id;
</script>

<ProgramDetailContainer {id} />
