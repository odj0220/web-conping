<script lang="ts">
import type { IProgram } from 'src/global/types';
import Thumbnail from './common/shared/Thumbnail.svelte';

export let program: IProgram;
export let onClick: (id: string) => void;

const { thumbnail, title, id } = program;
</script>

<li class="item" on:click={() => onClick(`${id}`)}>
  <Thumbnail src={thumbnail} alt={title} width="100%" height="20.3rem" />
  <h6 class="title">{title}</h6>
</li>

<style lang="scss">
.item {
  flex-shrink: 0;
  width: 14.4rem;

  .title {
    @include caption1-400;
    margin-top: 8px;
  }
}
</style>
