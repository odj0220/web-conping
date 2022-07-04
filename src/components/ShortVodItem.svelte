<script lang="ts">
    export let width: number = 140;
    export let content!: {
        id: string;
        name: string;
        description: string;
        createdAt: number;
        program: {
            id: string;
            name: string;
        };
        programId: string;
        thumb: string;
        url: string;
        videoId: string;
    };

</script>

<section
        style="width: {width / 10}rem"
>
    <div class="container">
        <img src={content.thumb} alt="shorts-preview">
        <div class="overlay"></div>
        <div class="data">
            <h6 class="title">
                {content.name}
            </h6>
        </div>
    </div>
</section>

<style lang="scss">
    section {
      margin-left: 1.2rem;
      .container {
        position: relative;
        padding-bottom: 171.42%;
        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #1c1c1c;
            opacity: 0.5;
            z-index: 2;
        }

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
          object-fit: cover;
        }

        .data {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          z-index: 3;

          .title {
            padding: 0 0.6rem 1rem 1rem;
            color: #fff;
          }
        }
      }
    }
</style>
