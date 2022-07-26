<script lang="ts">
  export let buttonName : string;
  export let onClick : () => void;
  export let theme = 'default';
</script>

<div
  class="button {theme}"
  role="button"
  on:click={() => onClick()}
>
  {buttonName}
</div>

<style lang="scss">
  .button {
    border: 1px solid #F2F2F2;
    border-radius: 0.2rem;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 1.4rem;
    
    &:active {
      background-color: #9E04EA;
    }

    &.none {
      border: none;
    }
  }
</style>
