<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  const id = $page.params.id;

  onMount(() => {
    document.getElementById('deeplink').click();
  });

</script>
<div class="page-wrap">
  <img class="section page-top" src="/images/deeplink_top.png" alt="공유 상단 이미지">
  <div class="section page-content">
    <div class="content-image">
      <a href="https://conping.page.link/{id}" id="deeplink">
        콘핑 앱 설치하기
      </a>
    </div>
  </div>
  <img class="section page-bottom" src="/images/deeplink_bottom.png" alt="공유 하단 이미지">
</div>


<style lang="scss">
  .page-wrap {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: #710EDD;
    display: flex;
    flex-direction: column;

    .section {
      height: auto;
      &.page-content {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        .content-image {
          width: 176px;
          height: 131px;
          background: url("/images/deeplink_main.png");
          display: flex;
          justify-content: center;
          align-items: flex-end;

          a {
            width: 136px;
            height: 40px;
            background: #FFFFFF;
            color: #0A0A0A;
            font-size: 14px;
            font-weight: bold;
            border-radius: 100px;
            display: inline-block;
            text-align: center;
            line-height: 42px;
            text-decoration: none;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
