<script type="ts">
  import type { ICeleb } from 'src/global/types';

  import Avatar from './Avatar.svelte';
  import Icon from './icons/Icon.svelte';

  export let data: ICeleb;

  const { thumbnail, name, description } = data;

</script>

<div class="profile-container">
  <div class="profile-visual">
    <div class="banner">
      <img src="/images/celeb_banner.png" alt={name} />
    </div>
    <div class="avatar">
      <Avatar src={thumbnail} size="8.8rem" alt={name}/>
    </div>
  </div>
  <div class="profile-info">
    <h6 class="name">{name}</h6>
    <p class="bio">{description}</p>
    <ul class="sns-list">
      <li class="sns-item">
        <span class="sns-icon">
          <Icon name="youtube" />
        </span>
        <span class="sns-follows">140만 명</span>
      </li>
      <li class="sns-item">
        <span class="sns-icon">
          <Icon name="instagram" />
        </span>
        <span class="sns-follows">1,400 명</span>
      </li>
    </ul>
  </div>
</div>

<style lang="scss">
.profile-container {
  .profile-visual {
    position: relative;
    margin-bottom: 4.4rem;
    .banner {
      width: 100%;
      padding-bottom: 94.4444%;
      background-color: yellow;
      img {
        position:absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .avatar {
      position: absolute;
      z-index: 1;
      bottom: -4.4rem;
      right: 2.4rem;
    }
  }
  .profile-info {
    padding: 0 2.4rem 4rem;
    .name {
      @include head1;
      margin-bottom: 2.4rem;
    }
    .bio {
      @include caption2-400;
      margin-bottom: 4.6rem;
      color: $disabled-8a;
      max-width: 210px;
      width: 100%;
      white-space: pre-line;
    }
    .sns-list {
      display: flex;
      .sns-item {
        display: flex;
        align-items: center;
        .sns-follows {
          @include caption2-700;
          margin-left: 0.4rem;
        }
        &:not(:last-child) {
          margin-right: 1.6rem;
        }
      }
    }
  }
}
</style>