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
    <div class="info-title">
      {(content.program.name).repeat(10)}
      <!-- TODO: 테스트용 코드 수정 -->
    </div>
    <div class="sub-info">
      <img class="profile-icon" src={content.thumb} alt="방송로고">
      <div>랜선뷰티 &middot; 5화 &middot; 2일 전</div>
      <!-- TODO: 하드코딩 -->
    </div>
  </div>
</li>

<style lang="scss">
  .item-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    
    .image-wrapper {
      flex: 1;
      
      img {
        width: 100%;
        border-radius: 0.4rem 0.4rem 0 0;
      }

      cursor: pointer;
    }

    .content-info-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      padding: 1.2rem;
      background-color: #212121;
      line-height: 1.2rem;

      .info-title {
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        word-wrap:break-word; 
        line-height: 1.2em;
        height: 3.6em;
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
      }
    }
  }

</style>