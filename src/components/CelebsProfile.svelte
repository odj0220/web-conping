<script type="ts">
import type { ICeleb } from 'src/global/types';

import Avatar from './Avatar.svelte';
export let data: ICeleb;

const { thumbnail, name } = data;

</script>
<div class="celebs-visual">
  <div class="main-visual">

  </div>
  <div class="user-visual">
    <Avatar src={thumbnail} size="8.8rem" alt={name}/>
  </div>
</div>

<style lang="scss">
.celebs-visual {
  position: relative;
  margin-bottom: 4.4rem;
  .main-visual {
    width: 100%;
    padding-bottom: 94.4444%;
    background-color: yellow;
  }
  .user-visual {
    position: absolute;
    bottom: -4.4rem;
    right: 2.4rem;
  }
}
</style>