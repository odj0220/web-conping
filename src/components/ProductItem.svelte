<script lang="ts">
import { toHHMMSS } from '../lib/util';
import { createEventDispatcher } from 'svelte';
import { openBrowser } from '../lib/util';
import Thumbnail from './common/shared/Thumbnail.svelte';

export let timelineButtonVisible: boolean;
export let name:string;
export let price: number;
export let exposed: any[] = [];
export let storeUrl: string;
export let image: string;

const dispatch = createEventDispatcher<{'set-video-current-time': {currentTime: number}}>();

const timelines = () => {
  let arr: any[] = [];
  exposed.map(el => arr.push(el[0]));
  return arr;
};

function setCurrentTime(time: number) {
  dispatch('set-video-current-time', {
    currentTime: time,
  });
}

function goStore() {
  openBrowser(storeUrl);
}
</script>

<li class="container">
    <div class="thumbnail" on:click={goStore}>
        <Thumbnail src={image} alt={name + '의 이미지'} width="8rem" height="8rem"/>
    </div>
    <div class="contents">
        <h6 class="name" on:click={goStore}>{name}</h6>
        <span class="price">{price.toLocaleString()}원</span>
        
        {#if timelineButtonVisible }
        <ul class="time-stamps">
            {#each timelines() as timeline}
            <li on:click="{() => setCurrentTime(timeline)}" class="time-stamp">
                {toHHMMSS(timeline)}
            </li>
            {/each}
        </ul>
        {/if}
    </div>
</li>

<style lang="scss">
.container {
    position: relative;
    display: flex;
    align-items: center;
    &:not(:last-child) {
        margin-bottom: 16px;
    }
}

.thumbnail {
    width: 8rem;
    height: 8rem;
    border-radius: 0.2rem;
    background-color: gray;
    margin-right: 12px;
    flex-shrink: 0;
}
.contents {
    display: flex;
    flex-direction: column;
    .name {
        @include caption2-400;
        @include ellipsis(1);
    }
    .price {
        @include body2-700;
        display: block;
        margin: 0.4rem 0 0;
    }
}
.time-stamps {
    display: flex;
    margin: 1.6rem 0 0;
}
.time-stamp {
    @include caption3;
    padding: 0.2rem 0.6rem;
    background-color: $bg-gray-32;
    border-radius: 2px;  
    &:not(:last-child) {
        margin-right: 8px;
    }    
}       

</style>
