<script lang="ts">
  import { returnParticle } from '$lib/utils/common';

  export let text: string;
</script>

<div class="empty-message">
  {text}{returnParticle(text)} 준비중입니다.<br />
  조금만 기다려주세요 &#58;&#41;
</div>

<style lang="scss">
  .empty-message {
    @include caption1-400;
    color: $disabled-8a;
    margin: 12rem 0;
    text-align: center;
  }
</style>