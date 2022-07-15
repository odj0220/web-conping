<script lang="ts">
export let height: string;
</script>

<div class="dimmend-container" style="height: {height};">
  <div class="dimmend-header">
    <slot name="header"></slot>
  </div>
  <div class="dimmend-body">
    <slot name="body"></slot>
  </div>
  <div class="dimmend-footer">
    <slot name="footer"></slot>
  </div>
</div>

<style lang="scss">
@import "../../../styles/variables.scss";

.dimmend-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: $bg-gray-32;
  border-top-left-radius: 0.8rem;
  border-top-right-radius: 0.8rem;
  .dimmend-header {
    @include caption2-700;
    color: $disabled-8a;
    padding: 2.4rem 2.4rem 1.6rem;
  }
  .dimmend-body {
    padding: 1rem 2.4rem 2.5rem;
  }
  .dimmend-footer {
    height: 5.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      @include body3-700;
      color: $text-white-f2;
    }
  }
}
</style>