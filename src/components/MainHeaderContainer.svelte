<script lang="ts">
  import Header from './Header.svelte';

  function handleClickButton(type: string) {
    // TODO: click 이벤트
    console.log(type, 'button clicked');
  }
  const BUTTONS = ['noti', 'setting'];
</script>

<Header onClick={handleClickButton} buttons={BUTTONS}/>
