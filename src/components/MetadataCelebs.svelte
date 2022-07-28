<script lang="ts">
  import Container from './common/layout/Container.svelte';
  import Title from './Title.svelte';
  import Avatar from './common/shared/Avatar.svelte';

  import type { ICeleb } from 'src/global/types';

  export let celebs:ICeleb[] = [];
</script>

<Container type="grayBox wide" margin="2.4rem 0 0">
  <Title
    title={[{ text: '출연 셀럽' }]}
    marginBottom="1.6rem"
    marginLeft="1.2rem"
  />
  <ul class="celebs">
    {#each celebs as celeb}
      <li class="celeb">
        <Avatar size={8} src={celeb.thumbnail} />
        <span class="celeb-name">{celeb.name}</span>
      </li>
    {/each}
  </ul>
</Container>

<style lang="scss">
  .celebs {
    display: flex;
    @include horizontalScroll(2rem, 1.2rem);
    .celeb {
      display: flex;
      align-items: center;
      flex-direction: column;
      .celeb-name {
        @include caption3;
        margin-top: 0.8rem;
      }
    }
  }
</style>
