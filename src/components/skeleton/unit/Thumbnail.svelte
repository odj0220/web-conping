<script lang="ts">
  import Icon from '$component/icons/Icon.svelte';

  export let width: string;
  export let height: string;
  export let borderRadius: string;
  export let bgColor = 'bg-black-21';

</script>

<div
class={`thumbnail ${bgColor}`}
style="width: {width}; padding-bottom: {height}; border-radius:{borderRadius}">
  <span class="icon">
    <Icon name="loading_small" />
  </span>
</div>

<style lang="scss">
  .thumbnail {
    position: relative;
    &.bg-black-21 {
      background-color: $bg-black-21;
    }
    &.bg-gray-32 {
      background-color: $bg-gray-32;
    }
    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
