<script lang="ts">
    import { Swiper, SwiperSlide } from 'swiper/svelte';
    import SwiperCore, { Autoplay, Pagination } from 'swiper';
    import 'swiper/css';
    import 'swiper/css/pagination';
    import { onMount } from 'svelte';
    import { graphqlApi } from '$lib/_api_graphql';

    let banners = [];

    onMount(async () => {
      const query = '{getBanners{title imgPath link}}';
      graphqlApi(query).then(response => {
        banners = response.data.getBanners;
      });
    });

    SwiperCore.use([Pagination, Autoplay]);

    function handleClick(swiper, event) {
      console.log('Real Index', swiper.detail[0].realIndex);
    }
</script>

<section class="swiper-container">
    <Swiper
            pagination={{ clickable: true }}
            spaceBetween={0}
            loop={true}
            autoplay={{ deplay: 1000 }}
            elementClass="main-banner"
            slideToClickedSlide={true}
            on:click={handleClick}
    >
        {#each banners as banner}
            <SwiperSlide>
                <section class="banner-wrapper">
                    <img src={banner.imgPath} alt="{banner.title}">
                </section>
            </SwiperSlide>
        {/each}
    </Swiper>
</section>

<style lang="scss">
    .swiper-container {
      padding: 0 1.6rem;

      :global(.swiper-pagination ) {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        left: -1rem;
      }

      :global(.swiper-pagination-bullet) {
        width: 0.6rem;
        height: 0.6rem;
        background: #fff;
        border: 1px solid pink;
        opacity: 0.5;
      }
      :global(.swiper-pagination-bullet-active) {
        width: 2rem;
        transition: width .5s;
        border-radius: 0.3rem;
        background: #fff;
        border: 1px solid transparent;
        opacity: 1;
      }

      .banner-wrapper {
        width: 100%;
        padding-bottom: 100%;
        position: relative;

        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
</style>
