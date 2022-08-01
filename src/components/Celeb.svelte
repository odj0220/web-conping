<script lang="ts">
  import type { ICeleb } from 'src/global/types';
  import Avatar from './common/shared/Avatar.svelte';

  export let celeb: ICeleb;
  export let onClick : (id: string) => void;

  const { id, name, thumbnail, categories, countOfFollowers, countOfProducts, countOfContents } = celeb;

</script>

<li class="item" on:click="{() => onClick(id)}">
  <Avatar size={7.2} src={thumbnail} alt={name}/>
  <div class="info">
    <div class="info-top">
      <h6 class="name">{name}</h6>
      <ul class="categories">
        {#if categories?.length}
          <li class="category" style="background-color: {categories[0].backColor}; color: {categories[0].textColor}">{categories[0].name}</li>
        {/if}
      </ul>
    </div>

    <ul class="info-list">
      {#if countOfFollowers}
        <li class="info-item">
          <span class="key">팔로워</span>
          <span class="value">{countOfFollowers.toLocaleString()}명</span>
        </li>
      {/if}

      {#if countOfProducts}
        <li class="info-item">
          <span class="key">상품</span>
          <span class="value">{countOfProducts.toLocaleString()}</span>
        </li>
      {/if}

      {#if countOfContents}
        <li class="info-item">
          <span class="key">콘텐츠</span>
          <span class="value">{countOfContents.toLocaleString()}</span>
        </li>
      {/if}

    </ul>
  </div>
</li>

<style lang="scss">
.item {
  padding: 1.2rem 1.6rem;
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  background-color: $bg-black-21;
  &:not(:last-child) {
    margin-bottom: 1.6rem;
  }
  .info {
    .info-top {
      display: flex;
      align-items: center;

      .name {
        @include body1-700;
        flex-shrink: 0;
      }
      .categories {
        margin-left: 8px;
        display: flex;
        align-items: center;
        .category {
          padding: 0.2rem 0.6rem;
          border-radius: 0.2rem;
          font-size: 11px;
          line-height: 14px;
          font-weight: 700;
          letter-spacing: -0.015em;
          color: $default-black;
          background-color: $primary-40;
          &:not(:last-child) {
            margin-right: 6px;
          }
        }
      }
    }
    .info-list {
      display: flex;
      align-items: center;
      .info-item {
        color: $gray-ab;
        font-size: 0;
        margin-top: 0.7rem;
        &:not(:last-child) {
          margin-right: 8px;
        }
        .key {
          @include caption2-400;
          margin-right: 4px;
        }
        .value {
          @include caption2-700;
        }
      }
    }
  }
}
</style>
