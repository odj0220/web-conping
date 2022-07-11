<script>
    import YoutubePlayer from '$component/youtube-player.svelte';
    import { onMount } from 'svelte';
    export let contents;
    let clientWidth;
    let clientHeight;

    onMount(() => {
      clientWidth = screen.width;
      clientHeight = screen.height;
    });
</script>

<h1>유튜브 미리보기</h1>
<YoutubePlayer videoId="8XZe5aX5Ruk"></YoutubePlayer>
