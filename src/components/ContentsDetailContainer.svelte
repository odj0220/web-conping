<script lang="ts">
import Avatar from './Avatar.svelte';
import MetadataContainer from './MetadataContainer.svelte';
import RelationProductContainer from './RelatedProductContainer.svelte';

const data = {
  name: 'dd',
  description: 'ddd',
};
</script>

<div class="container">
    <div class="player">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/pb3bt3MBHk0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <MetadataContainer {...data} />
    <RelationProductContainer />
</div>

<style lang="scss">
@import '../styles/variables.scss';
.player {
    position: relative;
    width: 100%;
    padding-bottom: 56.2%;
    height: 0px;
    overflow: hidden;
    background-color: gray;
    iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}
.comment-preview {
    padding: 1.6rem;
    .comment-title {
        display: flex;
        align-items: flex-end;
        margin-bottom: 1.6rem;
        .comment-heading {
            @include body1-700; 
            margin-right: 0.8rem;
        }
        .comment-length {
            @include caption2-400; 
            color: $disabled-8a 
        }
    }
    .comment-contents {
        display: flex;

        .comment-text {
            @include caption1-400;
            margin-left: 12px;
        }

    }
}
</style>