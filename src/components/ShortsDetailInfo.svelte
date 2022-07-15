<script lang="ts">
import Avatar from './Avatar.svelte';
import Icon from './icons/Icon.svelte';

export let onClickClose: (e: TouchEvent) => void;
export let onClickShare: (e: TouchEvent) => void;
export let onClickCart: (e: TouchEvent) => void;
export let onClickProfile: (e: TouchEvent) => void;


const BUTTONS = [
  {
    name: '공유',
    icon: 'share',
    handler: onClickShare,
  },
  {
    name: '상품',
    icon: 'cart',
    handler: onClickCart,
  },
];

</script>
<div class="section">
    <button class="btn-close" on:click="{onClickClose}">
        <Icon name="close" />
    </button>    
    <div class="contents">
        <div class="info">
            <h6 class="title">
                MZ세대의 트렌드 Y2K, 트렌드에 맞는 핵심 메이크업 비결은? MZ세대의 트렌드 Y2K, 트렌드에 맞는 핵심 메이크업 비결은?MZ세대의 트렌드 Y2K, 트렌드에 맞는 핵심 메이크업 비결은?
            </h6>
            <div class="profile" on:click="{onClickProfile}">
                <Avatar size="24px" />
                <span class="name">랜선뷰티</span>
            </div>
        </div>
        <div class="buttons">
            {#each BUTTONS as button}
                <button class="button" on:click="{button.handler}">
                    <Icon name={button.icon} />
                    <span class="value">{button.name}</span>
                </button>
            {/each}
        </div>
    </div>

</div> 
<style lang="scss">
    .section {
        .btn-close {
            position: fixed;
            top: 20px;
            left: 12px;
            z-index: 5;
        }
        .contents {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 24rem;
            background: $gradation-70;
            display: flex;
            gap: 20px;
            padding: 0 2rem 2.4rem 1.6rem;
            align-items: flex-end;
            z-index: 2;
            .info {
                .title {
                    @include body1-400;
                    margin-bottom: 1.6rem;
                    color: $all-white;
                }
                .profile {
                    display: flex;
                    align-items: center;
                    .name {
                        @include caption2-400;
                        margin-left: 0.8rem;
                        color: $text-white-f2;
                    }
                }
            }
            .buttons {
                flex-shrink: 0;
                flex-basis: 36px;
                .button {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    .value {
                        @include caption2-700;
                        color: $text-white-f2;
                    }
                    &:not(:last-child) {
                        margin-bottom: 1.6rem;
                    }
                }
            }
        }
    }
</style>
