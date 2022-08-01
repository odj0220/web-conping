<script lang="ts">
  import Icon from '$component/icons/Icon.svelte';

  export let rank: string;
  export let iconTheme: string;

  function getIconName(theme:string) {
    return `badge_rank_${theme.toLowerCase()}`;
  }

  $: iconName = getIconName(iconTheme);
</script>

<div class="badge">
  <Icon name={iconName} />
  <div class="number">{rank}</div>
</div>

<style lang="scss">
  .badge {
    position: absolute;
    top: 0;
    left: 1.2rem;
    
    .number {
      position: absolute;
      top: 0;
      left: 0;
      width: 2.3rem;
      height: 3.2rem;
      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 12px;
      font-weight: 700;
    }
  }
</style>
