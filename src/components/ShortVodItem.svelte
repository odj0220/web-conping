<script lang="ts">
  import type { Content } from 'src/global/types';

  export let content: Content;
  export let onClick: (id: string) => void;
</script>

<div class="container" on:click={() => onClick(`${content.id}`)}>
  <img src={content.thumb} alt="shorts-preview">
    <h6 class="title">
      {content.title}
    </h6>
</div>

<style lang="scss">

.container {
  width: 14.4rem;
  height: 22rem;
  border-radius: 0.4rem;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: flex-end;

  &:after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 12rem;
    background: $gradation-50;
    z-index: 2;
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
    object-fit: cover;
  }
  .title {
    z-index: 3;
    padding: 0.8rem;
    @include caption2-400;
    @include ellipsis(3)
  }
}
</style>
