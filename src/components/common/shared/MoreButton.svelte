<script lang="ts">
  export let onClick: () => void;

  export let value: string;
</script>

<button on:click="{() => onClick()}">{value}</button>

<style lang="scss">
  button {
    border-radius: 0.2rem;
    border: 1px solid #f2f2f2;
    width: 100%;
    height: 4rem;
    color: #f2f2f2;
  }
</style>