<script lang="ts">
  import { Swiper, SwiperSlide } from 'swiper/svelte';
  import SwiperCore, { Pagination } from 'swiper';

  import 'swiper/scss';
  import 'swiper/scss/pagination';

  import type { IRelatedItem } from 'src/global/types';

  import RelatedItem from './RelatedItem.svelte';

  export let relatedItems: IRelatedItem[];
  export let onClickRelatedItem: () => void;

  SwiperCore.use([Pagination]);
</script>

<Swiper
  pagination
  scrollbar={{ draggable: true }}
  loop={true}
  slideToClickedSlide={true}
  spaceBetween={0}
>
  {#each relatedItems as relatedItem }
    <SwiperSlide>
      <RelatedItem {relatedItem} {onClickRelatedItem}/>
    </SwiperSlide>
  {/each}
</Swiper>

<style lang="scss">
 :global(.swiper) {
    flex: 1;
    display: flex;
    flex-direction: column;
    max-width: calc(50vw - 2.6rem);
  }
  :global(.swiper-pagination ) {
    position: relative;
    display: flex;
    align-items: center;
    left: auto!important;
    bottom: auto!important;
    margin-top: 1.3rem;
  }
  :global(.swiper-pagination-bullet) {
    width: 0.6rem;
    height: 0.6rem;
    background: #fff;
    opacity: 0.5;
    margin: 0;
    border-radius: 0.3rem;
    margin-left: 0!important;
    margin-right: 0.6rem;
  }
  :global(.swiper-pagination-bullet-active) {
    opacity: 1;
  }

</style>
