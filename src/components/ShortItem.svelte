<script lang="ts">
    export let width: number = 140;

    function handleClick() {
        console.log('아이템 클릭');
    }
</script>

<section
        on:click={handleClick}
        style="width: {width / 10}rem"
>
    <div class="container">
        <img src="/images/shorts_01.png" alt="shorts-preview">
        <div class="data">
            <h6 class="title"></h6>
            <div class="creator">
            <span class="youtuber">
                랜선뷰티
            </span>
                <span class="divider"></span>
                <date>
                    날짜
                </date>
            </div>
        </div>
    </div>
</section>

<style lang="scss">
    section {
      .container {
        position: relative;
        padding-bottom: 171.42%;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          -webkit-user-drag: none;
          -khtml-user-drag: none;
          -moz-user-drag: none;
          -o-user-drag: none;
          user-drag: none;
        }

        .data {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          z-index: 2;
        }
      }
    }
</style>
