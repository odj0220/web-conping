<script lang="ts">
export let bannerList: any[] = [];
export let onClick: (category: string) => void;
</script>

<ul class="settings-banner">
  {#each bannerList as banner}
    <li class="banner" on:click="{() => onClick(banner.name)}">
      <img src={banner.image} alt={banner.name} />
    </li>
  {/each}
</ul>

<style lang="scss">
.settings-banner {
  padding: 0.8rem 1.6rem 2.4rem;
  .banner {
    width: 100%;
    &:not(:last-child) {
      margin-bottom: 1.6rem;
    }
    img {
      width: 100%;
    }
  }
}
</style>
