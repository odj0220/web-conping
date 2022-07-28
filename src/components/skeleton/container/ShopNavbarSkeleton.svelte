<script lang="ts">
  import Bar from '../unit/Bar.svelte';

</script>
<ul>
  <li class="tab">
    <Bar width="2.8rem" height="2rem" bgColor="bg-gray-32"/>
  </li>
  <li class="tab">
    <Bar width="8rem" height="2rem" bgColor="bg-black-21"/>
  </li>
  <li class="tab">
    <Bar width="5rem" height="2rem" bgColor="bg-black-21"/>
  </li>
  <li class="tab">
    <Bar width="4.5rem" height="2rem" bgColor="bg-black-21"/>
  </li>
</ul>

<style lang="scss">
  ul {
    padding: 0 1.6rem;
    display: flex;
    border-bottom: 1px solid $bg-black-21;
    .tab {
      padding: 1.6rem 0;
      &:not(:last-child) {
        margin-right: 2rem;
      }
      &:first-child {
        position: relative;
        &:after {
          content: "";
          background-color: $bg-gray-32;
          position: absolute;
          bottom: 0rem;
          height: 0.3rem;
          width: 100%;
        }
      }
    }
  }
</style>