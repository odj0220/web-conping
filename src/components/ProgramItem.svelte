<script lang="ts">
  import type { Program } from 'src/global/types';

  export let program: Program;
  export let onClick: (id: string) => void;

  const { thumbnail, title, id } = program;
</script>

<li class="item" on:click={() => onClick(`${id}`)}>
  <div class="thumbnail">
    <img src={thumbnail} alt={title} />
  </div>
  <h6 class="title">{title}</h6>
</li>

<style lang="scss">
  .item {
    flex-shrink: 0;
    width: 144px;
    &:not(:last-child) {
        margin-right: 12px;
    }
    .thumbnail {
        border-radius: 0.4rem;
        overflow: hidden;
        img {
            width: 100%;
            height: 203px;
            object-fit: cover;
        }
    }
    .title {
        @include caption1-400;
        margin-top: 8px;
    }
  }
</style>
