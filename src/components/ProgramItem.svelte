<script lang="ts">
  import type { Program } from 'src/global/types';

  export let program: Program;
  export let onClick: (id: string) => void;

  const { bannerImg, name, id } = program;
</script>

<li class="item" on:click={() => onClick(`${id}`)}>
  <div class="bannerImg">
    <img src={bannerImg} alt={name} />
  </div>
  <h6 class="name">{name}</h6>
</li>

<style lang="scss">
  .item {
    flex-shrink: 0;
    width: 144px;
    &:not(:last-child) {
        margin-right: 12px;
    }
    .bannerImg {
        border-radius: 0.4rem;
        overflow: hidden;
        img {
            width: 100%;
            height: 203px;
            object-fit: cover;
        }
    }
    .name {
        @include caption1-400;
        margin-top: 8px;
    }
  }
</style>
