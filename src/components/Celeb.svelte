<script lang="ts">
  import type { ICeleb } from 'src/global/types';

  import Avatar from './Avatar.svelte';

  export let celeb: ICeleb;

  const { id, name, thumbnail } = celeb;

</script>

<li class="item">
  <Avatar size="72px" src={thumbnail}/>
  <div class="info">
    <div class="info-top">
      <h6 class="name">{name}</h6>
      <ul class="tags">
        <li class="tag">뷰티</li>
        <li class="tag">IT</li>
      </ul>
    </div>
    <ul class="info-list">
      <li class="info-item">
        <span class="key">팔로워</span>
        <span class="value">60.2만명</span>
      </li>
      <li class="info-item">
        <span class="key">콘텐츠</span>
        <span class="value">2</span>
      </li>
      <li class="info-item">
        <span class="key">상품</span>
        <span class="value">9</span>
      </li>
    </ul>
  </div>
</li>

<style lang="scss">
    @import "../styles/variables.scss";

    .item {
        padding: 1.2rem 1.6rem;
        border-radius: 0.4rem;
        display: flex;
        align-items: center;
        gap: 2rem;
        background-color: $bg-black-21;
        margin-bottom: 1.6rem;
        &:not(:last-child) {
        }
        .info {
            .info-top {
                display: flex;
                align-items: center;
                margin-bottom: 7px;
                .name {
                    @include body1-700;
                    
                }
                .tags {
                    margin-left: 8px;
                    display: flex;
                    align-items: center;
                    .tag {
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