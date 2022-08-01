<script lang="ts">
  import Container from '$component/common/layout/Container.svelte';
  import Icon from '$component/icons/Icon.svelte';
  import Bar from '../unit/Bar.svelte';
import Item from '../unit/Item.svelte';
import List from '../unit/List.svelte';
import Rect from '../unit/Rect.svelte';

</script>

<Container type="full" margin="0">
  <div class="visual">
    <div class="banner">
      <span class="logo">
        <Icon name="logo_gray" />
      </span>
    </div>
    <div class="avatar">
      <Icon name="loading_small" />
    </div>
  </div>
  <Rect padding="0 2.4rem 4rem 2.4rem">
    <Bar height="3.3rem" bgColor="bg-black-21" margin="0 0 2.6rem"/>
    <Bar height="1.2rem" width="21rem" bgColor="bg-black-21" margin="0 0 0.4rem"/>
    <Bar height="1.2rem" width="21rem" bgColor="bg-black-21" margin="0 0 0.4rem"/>
    <Bar height="1.2rem" width="21rem" bgColor="bg-black-21" margin="0 0 0.4rem"/>
    <Bar height="1.2rem" width="21rem" bgColor="bg-black-21" margin="0 0 0.4rem"/>
    <Bar height="1.2rem" width="14rem" bgColor="bg-black-21" margin="0 0 4.6rem"/>
    <List>
      <Item margin="0 1.6rem 0 0">
        <Bar height="2.4rem" width="8rem" bgColor="bg-black-21" />
      </Item>
      <Item>
        <Bar height="2.4rem" width="8rem" bgColor="bg-black-21" />
      </Item>
    </List>
  </Rect>
  <ul class="tabs">
    <li class="tab">
      <Bar width="2.8rem" height="2rem" bgColor="bg-gray-32"/>
    </li>
    <li class="tab">
      <Bar width="2.8rem" height="2rem" bgColor="bg-black-21"/>
    </li>
    <li class="tab">
      <Bar width="4rem" height="2rem" bgColor="bg-black-21"/>
    </li>
    <li class="tab">
      <Bar width="2.8rem" height="2rem" bgColor="bg-black-21"/>
    </li>
  </ul>
</Container>

<style lang="scss">
.visual {
  position: relative;
  padding-bottom: 4.4rem;
  .banner {
    padding-bottom: 94.444%;
    background-color: $bg-black-21;
    display: flex;
    align-items: center;
    justify-content: center;
    .logo {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;

    }
  }
  .avatar {
    width: 8.8rem;
    height: 8.8rem;
    border-radius: 50%;
    background-color: $bg-gray-32;
    position: absolute;
    bottom: 0;
    right: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.tabs {
  padding: 0 1.6rem;
  display: flex;
  border-bottom: 1px solid $bg-black-21;
  padding-bottom: 1rem;
  .tab {
    &:not(:last-child) {
      margin-right: 2rem;
    }
    &:first-child {
      position: relative;
      &:after {
        content: "";
        background-color: $bg-gray-32;
        position: absolute;
        bottom: -1rem;
        height: 0.3rem;
        width: 100%;
      }
    }
  }
}
</style>