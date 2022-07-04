<script lang="ts">
    import {onMount} from "svelte";

    export let content!: {
        contentType: string;
        createDt: number;
        description: string;
        id: string;
        program: {
            id: string;
            name: string;
        };
        programId: string;
        round: number;
        thumb: string;
        url: string;
        videoId: string;
    };

    export let percent = 24;
    let ratio = 0;

    onMount(() => {
        ratio = ((360 / 100) * percent) / 2;
    });
</script>


<section class="viewing-vod-item">
    <div class="thumb-wrapper">
        <div class="circle">
            <!-- 원 테두리 -->
            <div class="mask half">
                <div class="fill" style="transform: rotate({ratio}deg)"></div>
            </div>
            <div class="mask full" style="transform: rotate({ratio}deg)">
                <div class="fill" style="transform: rotate({ratio}deg)"></div>
            </div>
        </div>
        <img class="thumbnail" src={content.thumb} alt="thubnail"/>
    </div>

    <div class="name">
        {content.name}
    </div>
</section>

<style lang="scss">
    .viewing-vod-item {
      width: 8rem;

      .thumb-wrapper {
        position: relative;
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
        overflow: hidden;
        background-color: #F2F2F2;

        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 7.6rem;
          height: 7.6rem;
          border-radius: 50%;
          z-index: 2;
          object-fit: cover;
          object-position: center center;
        }

        .circle {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;

          .mask, .fill {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }

          .mask {
            clip: rect(0px, 8rem, 8rem, 4rem);
            .fill {
              clip: rect(0, 4rem, 8rem, 0);
              background-color: #AE3EEF;
            }
          }
        }
      }
    }
</style>
