<script lang="ts">
export let player;
export let playerId: string;
</script>

<div class="player-wrap">
    <div id='{playerId}' class="youtube-player"></div>
</div>

<style lang="scss">
.player-wrap {
    width: 100%;
    height: auto;
    position: relative;
    padding-top: 56.25%;
    overflow: hidden;

    .youtube-player {
        z-index: 1;
        top: 0;
        left: 0;
        position: absolute;
        width: 100%;
        height: 100%;
    }
}
</style>