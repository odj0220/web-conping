<script>
    import YoutubePlayer from '$component/youtube-player.svelte';
    export let contents;
</script>

<h1>유튜브 미리보기</h1>
{#each contents as content}
    <YoutubePlayer videoId="{content.videoId}"></YoutubePlayer>
{/each}
