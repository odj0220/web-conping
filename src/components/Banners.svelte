<script lang="ts">
    import { Swiper, SwiperSlide } from 'swiper/svelte';
    import SwiperCore, { Autoplay, Pagination } from 'swiper';
    import 'swiper/css';
    import 'swiper/css/pagination';
    import { openBrowser } from '../lib/util';

    export let banners = [];

    SwiperCore.use([Pagination, Autoplay]);

    function handleClick(swiper, event) {
      const bannerIndex = swiper.detail[0].realIndex;
      const { link: { to, openBrowser: isOpenBrowser } } = banners[bannerIndex];
    
      if (isOpenBrowser) {
        goPageUsingBrowser(to);
      } else {
        goPage(to);
      }
    }

    function goPage(link: string) {
      window.location.href = link;
    }

    function goPageUsingBrowser(link: string) {
      openBrowser(link);
    }
</script>

<section class="swiper-container">
    <Swiper
            pagination={{ clickable: true }}
            spaceBetween={0}
            loop={false}
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
      border-radius: 0.4rem;
      overflow: hidden;
      :global(.swiper-pagination ) {
        display: flex;
        align-items: center;
        left: 1.6rem;
        bottom: 1.6rem;
      }

      :global(.swiper-pagination-bullet) {
        width: 0.6rem;
        height: 0.6rem;
        background: #fff;
        opacity: 0.5;
        margin: 0;
        border-radius: 0.3rem;
        &:not(:last-child) {
          margin-right: 6px;
        }
      }
      :global(.swiper-pagination-bullet-active) {
        width: 2rem;
        transition: width .5s;
        background: #fff;
        opacity: 1;
      }

      .banner-wrapper {
        position: relative;
        width: 100%;
        padding-bottom: 100%;
        border-radius: 4px;
        overflow: hidden;

        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
</style>
