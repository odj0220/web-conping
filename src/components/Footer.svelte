<script lang="ts">
    import Icon from './icons/Icon.svelte';
</script>

<footer>
    <nav>
        <ul>
            <li>
                <a href="/">
                    <Icon name="gnb_home"/>
                </a>
            </li>

            <li>
                <a href="/">
                    <Icon name="gnb_shop"/>
                </a>
            </li>

            <li>
                <a href="/">
                    <Icon name="gnb_celeb"/>
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
