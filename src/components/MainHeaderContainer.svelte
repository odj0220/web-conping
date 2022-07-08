<script lang="ts">
  import Header from './Header.svelte';

  function handleClickButton(type: string) {
    // TODO: click 이벤트
    console.log(type, 'button clicked');
  }
</script>

<Header onClick={handleClickButton}/>
