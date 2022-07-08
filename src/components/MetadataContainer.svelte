<script lang="ts">
import Avatar from './Avatar.svelte';
import GrayBox from './GrayBox.svelte';
import Hscroller from './HorizontalScroller.svelte';

import Icon from './icons/Icon.svelte';

export let name: string;
export let description: string;

</script>

<section class="container">
    <h4 class="name">{name}</h4>
    <span class="info">2022.05.04~2022.06.22 &middot 8부작 &middot (수) 오후 08:00</span>
    <h5 class="title">MZ세대의 트렌드 Y2K, 트렌드에 맞는 핵심 메이크업 비결을 알아보자!!??</h5>
    <div class="desc">
      {description}
    </div>
    <GrayBox title="골라라 셀럽">
      <Hscroller>
        <ul class="profile-list">
          <li class="profile-item">
            <Avatar size="80px" src="" />
            <span class="profile-name">이름</span>
            <span class="profile-role">역할</span>
          </li>
        </ul>
      </Hscroller>
    </GrayBox>
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
        margin-top: 8px;
      }
      .info {
        @include body3-400;
        display: block;
        color: $disabled-8a;
      }
      .desc {
        @include caption1-400;
        margin: 24px 0;
      }

    }
    .profile-list {
      .profile-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        @include caption3;
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