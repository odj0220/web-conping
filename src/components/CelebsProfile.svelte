<script type="ts">
import type { ICeleb } from 'src/global/types';

import Avatar from './Avatar.svelte';
export let data: ICeleb;

const { thumbnail, name } = data;

</script>
<div class="profile-container">
  <div class="banner">

  </div>
  <div class="avatar">
    <Avatar src={thumbnail} size="8.8rem" alt={name}/>
  </div>
</div>

<style lang="scss">
.profile-container {
  position: relative;
  margin-bottom: 4.4rem;
  .banner {
    width: 100%;
    padding-bottom: 94.4444%;
    background-color: yellow;
  }
  .avatar {
    position: absolute;
    bottom: -4.4rem;
    right: 2.4rem;
  }
}
</style>