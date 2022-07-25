<script lang="ts">
    import Icon from './icons/Icon.svelte';
    import { page } from '$app/stores';
    $: isHome = $page.url.pathname === '/';
    $: isShop = $page.url.pathname === '/shop';
    $: isCeleb = $page.url.pathname === '/celebs';
</script>

<footer>
    <nav>
        <ul>
            <li>
                <a href="/">
                    <Icon name={isHome ? 'gnb_home_on' : 'gnb_home_off'}/>
                </a>
            </li>

            <li>
                <a href="/shop">
                    <Icon name={isShop ? 'gnb_shop_on' : 'gnb_shop_off'}/>
                </a>
            </li>

            <li>
                <a href="/celebs">
                    <Icon name={isCeleb ? 'gnb_celeb_on' : 'gnb_celeb_off'}/>
                </a>
            </li>
        </ul>
    </nav>
</footer>

<style lang="scss">
    footer {
      width: 100%;
      position: sticky;
      bottom: 0;
      left: 0;
      background-color: $default-black;
      z-index: 10;
      nav {
        width: 100%;
        ul {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;

          li {
            width: 100%;
          }
        }
      }
    }

</style>
