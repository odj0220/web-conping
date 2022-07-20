<script lang="ts">
</script>

<div class="dimmend-container">
  <div class="layer"></div>
  <div class="dimmend-inner">
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
</div>

<style lang="scss">
@import "../../../styles/variables.scss";

.dimmend-container {
  .layer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(10, 10, 10, 0.8);
    z-index: 51;
    opacity: 0;
    visibility: hidden;
    transition: 0.3s;
  }
  .dimmend-inner {
    position: fixed;
    left: 0;
    right: 0;
    width: 100%;
    border-top-left-radius: 1.6rem;
    border-top-right-radius: 1.6rem;
    background-color: $bg-gray-32;
    .dimmend-header {
      @include caption2-700;
      color: $disabled-8a;
      padding: 2.4rem 2.4rem 1.6rem;
    }
    .dimmend-body {
      padding: 1rem 2.4rem 2.5rem;
    }
    .dimmend-footer {
      display: flex;
      align-items: center;
      justify-content: center;
      button {
        @include body3-700;
        color: $text-white-f2;
        min-height: 5.4rem;
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
      }
    }
  }
}
</style>