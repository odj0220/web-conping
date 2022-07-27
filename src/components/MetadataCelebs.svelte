<script lang="ts">
  import Container from './common/layout/Container.svelte';
  import Title from './Title.svelte';
  import Avatar from './Avatar.svelte';

  import type { ICeleb } from 'src/global/types';

  export let celebs:ICeleb[] = [];

</script>

<Container type="grayBox" margin="2.4rem 0 0">
  <Title
    title={[{ text: '출연 셀럽' }]}
    marginBottom="1.6rem"
  />
  <ul class="celebs">
    {#each celebs as celeb}
      <li class="celeb">
        <Avatar size="8rem" src="" />
        <span class="celeb-name">asdf</span>
      </li>
    {/each}
  </ul>
</Container>

<style lang="scss">
  .celebs {
    display: flex;
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
