<script>
  export let contents;
</script>

<h1>
  지금 인기있는 영상
</h1>

<ul>
  {#each contents as content }
    <li>
      <div>
        <img src={content.thumb} alt={content.name}>
        {content.program.name}
      </div>
    </li>
  {/each}
</ul>

<style lang="scss">
  
</style>