<script lang="ts">
import type { IProgram } from 'src/global/types';

export let program: IProgram;
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
  width: 14.4rem;
<<<<<<< HEAD
  
=======
  box-sizing: content-box;
  &:last-child {
    margin-right: 1.6rem;
  }

>>>>>>> c5c67cab6520de937071a8ca7a6e1f05c1ddda41
  .thumbnail {
    border-radius: 0.4rem;
    overflow: hidden;
    height: 20.3rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .title {
    @include caption1-400;
    margin-top: 8px;
  }
}
</style>
