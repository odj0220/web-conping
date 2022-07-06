<script lang="ts">
  interface TitleElement {
    text : string,
    color?: string
  }

  export let title : TitleElement[];
</script>

<h1>
  {#each title as element }
    <span style="color:{element?.color}">{element.text} </span>
  {/each}
</h1>

<style lang="scss">
  h1 {
    font-size: 1.6rem;
    line-height: 1.997rem;
    font-weight: 700;
    color: #fff;
  }
</style>
