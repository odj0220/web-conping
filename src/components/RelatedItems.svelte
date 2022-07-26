<script lang="ts">
  import { Swiper, SwiperSlide } from 'swiper/svelte';
  import SwiperCore, { Pagination } from 'swiper';

  import 'swiper/scss';
  import 'swiper/scss/pagination';
  
  import type { IRelatedItem } from 'src/global/types';
  
  import RelatedItem from './RelatedItem.svelte';

  export let relatedItems: IRelatedItem[];
  
  SwiperCore.use([Pagination]);
</script>

<Swiper
  pagination
  scrollbar={{ draggable: true }}
  loop={true}
  slideToClickedSlide={true}
>
  {#each relatedItems as relatedItem }
    <SwiperSlide>
      <RelatedItem {relatedItem} />
    </SwiperSlide>
  {/each}
</Swiper>

<style lang="scss">
  :global(.swiper) {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
    max-width: 19rem;
  }

  :global(.swiper-pagination-bullets) {
    display: flex;
    justify-content: flex-start;
  }
  
  :global(.swiper-pagination-bullet) {
    width: 0.6rem;
    height: 0.6rem;
    background: $all-white;
    opacity: 0.5;
  }
  
  :global(.swiper-pagination-bullet-active) {
    width: 0.6rem;
    height: 0.6rem;
    background: $all-white;
    opacity: 1;
  }
</style>
