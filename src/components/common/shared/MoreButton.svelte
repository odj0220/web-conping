<script lang="ts">
  export let onClick: () => void;
  export let value: string;
  export let margin: '0';
  
</script>

<button on:click="{() => onClick()}" style="margin:{margin}">{value}</button>

<style lang="scss">
  button {
    @include body3-700;
    border-radius: 0.2rem;
    border: 1px solid #f2f2f2;
    width: 100%;
    height: 4rem;
    color: #f2f2f2;
  }
</style>