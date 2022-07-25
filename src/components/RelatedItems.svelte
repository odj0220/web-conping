<script lang="ts">
  import { Swiper, SwiperSlide } from 'swiper/svelte';
  import 'swiper/scss';
  
  import type { IRelatedItem } from 'src/global/types';
  
  import RelatedItem from './RelatedItem.svelte';

  export let relatedItems: IRelatedItem[];
</script>

<Swiper>
  {#each relatedItems as relatedItem }
    <SwiperSlide>
      <RelatedItem {relatedItem} />
    </SwiperSlide>
  {/each}
</Swiper>

<style lang="scss">
  :global(.swiper ) {
    flex: 1;
    display: flex;
    max-width: 15.6rem;
  }
</style>
