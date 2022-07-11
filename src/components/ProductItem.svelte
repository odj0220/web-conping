<script lang="ts">
export let name:string;
export let price: number;
export let exposed: any[] = [];
export let setCurrentTime : (num: number) => void;

const timelines = () => {
  let arr: any[] = [];
  exposed.map(el => arr.push(el[0]));
  return arr;
};

</script>

<li class="container">
    <div class="thumbnail">
        <img src="" alt="" />
    </div>
    <div class="contents">
        <h6 class="name">{name}</h6>
        <span class="price">1,000원</span>
        <ul class="time-stamps">
            {#each timelines() as timeline}
                <li on:click="{() => setCurrentTime(timeline)}" class="time-stamp">{timeline}</li>
            {/each}
            
        </ul>
    </div>
</li>

<style lang="scss">
@import "../styles/variables.scss";
@import "../styles/modules.scss";

.container {
    position: relative;
    display: flex;
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
    padding-top: 0.4rem;
    .name {
        @include caption2-400;
        @include ellipsis(1);
    }
    .price {
        @include body2-700;
        display: block;
        margin: 0.4rem 0 1.6rem;
    }
}
.time-stamps {
    display: flex;
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