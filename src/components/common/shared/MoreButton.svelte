<script lang="ts">
  export let onClick: () => void;
  export let value: string;
  export let margin: '0';
</script>

<div class="button-wrapper" style="margin:{margin}">
  <button on:click="{() => onClick()}">{value}</button>
</div>

<style lang="scss">
  .button-wrapper {
    box-sizing: border-box;
    display: flex;
    button {
      @include body3-700;
      flex-grow: 1;
      border-radius: 0.2rem;
      border: 1px solid #f2f2f2;
      height: 4rem;
      color: #f2f2f2;
    }
  }
</style>
