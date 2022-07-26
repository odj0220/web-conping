<script lang="ts">
  export let height: string;
  export let borderRadius: string;
  export let padding: string;
  export let margin: string;

</script>

<div class="rect" style="height: {height}; border-radius:{borderRadius}; padding:{padding}; margin:{margin}">
  <slot></slot>
</div>

<style lang="scss">
  .rect {
    position: relative;
    background-color: $bg-black-21;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
</style>
