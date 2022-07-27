<script lang="ts">
  import Icon from '$component/icons/Icon.svelte';

  export let src = '';
  export let alt = '';
  export let width = '100%';
  export let height = '100%';
  export let defaultHeight = '100%';

  const setImageSrc = (value: string) => {
    src = value;
  };

</script>

<div class="image" style="width: {width}; padding-bottom: {height}">
  {#if src}
  <img src={src} alt={alt} on:error="{() => setImageSrc("")}"/>
  {:else}
  <div class="empty" style="padding-bottom: {defaultHeight};">
    <span class="icon">
      <Icon name="logo_gray" />
    </span>
  </div>
  {/if}
</div>

<style lang="scss">
.image {
  position: relative;
  border-radius: 0.4rem;
  overflow: hidden;
  background-color: $bg-black-21;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .empty {
    width: 100%;
    padding-bottom: 141%;
    position: relative;
    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>