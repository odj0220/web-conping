<script lang="ts">
import Avatar from './Avatar.svelte';
import GrayBox from './CenterSection.svelte';
import Hscroller from './HorizontalScroller.svelte';

export let name: string;
export let title: string;
export let description: string;
export let airingBeginAt: number;
export let airingEndAt: number;
export let airingAt: number;
export let celebs: any;

</script>

<section class="container">
    {#if name}<h4 class="name">{name}</h4>{/if}
    <span class="info">
      {#if airingBeginAt && airingEndAt}{airingBeginAt}~{airingEndAt} &middot{/if}
      8부작 &middot 
      {airingAt}</span>
    {#if title}<h5 class="title">{title}</h5>{/if}
    {#if description}<div class="description">{description}</div>{/if}

    {#if celebs?.length}
      <GrayBox title="골라라 셀럽">
        <Hscroller>
          <ul class="profile-list">
            {#each celebs as celeb}
              <li class="profile-item">
                <Avatar size="80px" src="{celeb.thumbnail}" />
                <span class="profile-name">{celeb.name}</span>
              </li>
            {/each}
          </ul>
        </Hscroller>
      </GrayBox>
    {/if}
  </section>  


  <style lang="scss">
    @import '../styles/variables.scss';

    .container {
      padding: 1.6rem;
      .name {
        @include title1-700;
        margin-bottom: 0.8rem;
      }
      .title {
        @include body3-700;
        margin: 8px 0 24px;
      }
      .info {
        @include body3-400;
        display: block;
        color: $disabled-8a;
      }
      .description {
        @include caption1-400;
        margin: 24px 0;
      }

    }
    .profile-list {
      display: flex;
      .profile-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        @include caption3;

        &:not(:last-child) {
          margin-right: 12px;
        }

        .profile-name {
          display: block;
          margin: 0.4rem 0 0.2rem;
        }
        .profile-role {
          color: $disabled-8a;
        }

      }
    }
  </style>
