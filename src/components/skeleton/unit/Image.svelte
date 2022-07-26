<script lang="ts">
  import Icon from '$component/icons/Icon.svelte';

  export let width: string;
  export let height: string;
  export let borderRadius: string;

</script>

<div class="image" style="width: {width}; padding-bottom: {height}; border-radius:{borderRadius}">
  <span class="logo">
    <Icon name="logo_gray" />
  </span>
</div>

<style lang="scss">
  .image {
    position: relative;
    background-color: $bg-black-21;
    .logo {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>