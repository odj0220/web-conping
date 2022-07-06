<script>
  export let onClick;
  export let content;
</script>

<li
  class="item-card"
  role="list"
>
  <div class="image-wrapper">
    <img
      src={content.thumb} alt={content.name}
      on:click={() => onClick(content.id)}
    >
  </div>
  <div class="content-info-wrapper">
    <div
      class="info-title"
      on:click={() => onClick(content.id)}
    >
      {(content.program.name).repeat(15)}
      <!-- TODO: 테스트용 코드 수정 -->
    </div>
    <div class="sub-info">
      <img class="profile-icon" src={content.thumb} alt="방송로고">
      <span class="profile-info">랜선뷰티 &middot; 5화 &middot; 2일 전</span>
      <!-- TODO: 하드코딩 -->
    </div>
  </div>
</li>

<style lang="scss">
  @import '../styles/modules.scss';
  @import '../styles/variables.scss';

  .item-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 0.4rem;
    overflow: hidden;
    
    .image-wrapper {
      width: 100%;
      height: 56.4%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        
        &:active {
          transform: scale(1.01);
          //TODO: 클릭할 때 효과 정의 필요
        }
      }

      cursor: pointer;
    }

    .content-info-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      padding: 1.2rem;
      background-color: $bg-black-21;

      .info-title {
        @include ellipsis(3);
        @include caption1-400;

        &:active {
          transform: scale(1.01);
          //TODO: 클릭할 때 효과 정의 필요
        }
      }

      .sub-info {
        display: flex;
        flex-direction: row;
        gap: 0.8rem;
        align-items: center;
        
        .profile-icon {
          width: 2.4rem;
          height: 2.4rem;
          overflow: visible;
          border-radius: 1.2rem;
          object-fit: fill;
        }
        .profile-info {
          @include caption2-400;
        }
      }
    }
  }

</style>