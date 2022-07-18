<script lang="ts">
  import type { IContent } from 'src/global/types';

  export let content: IContent;
  export let onClick: (id: string) => void;
  export let width = '100%';
  export let height = '166%';
</script>

<li class="container" on:click={() => onClick(`${content.id}`)} style="width: {width}; padding-bottom:{height}">
  <img src={content.thumb} alt="shorts-preview" />
  <h6 class="title">
    {content.title}
  </h6>
</li>

<style lang="scss">

.container {
  flex-shrink: 0;
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
    object-fit: cover;
  }
  .title {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 3;
    padding: 0.8rem;
    @include caption2-400;
    @include ellipsis(3);
  }
}
</style>
