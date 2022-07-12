<script type="ts">
  import { onMount } from 'svelte';
  import { callToast, callShare, callConfirm } from '$lib/_app_communication';
  import { getList, setContents } from '$lib/_continue_watching';


  onMount(() => {

  });

  function sendTost() {
    callToast('토스트 전송');
  }
  function sendShare() {
    callShare();
  }
  function sendConfirm() {
    callConfirm('오키할래 안할래?', boolean => {
      alert(boolean);
    });
  }
  function getStorage() {
    getList();
  }
  function setStorage() {
    setContents({ id: '123', name: 'test' });
  }
</script>

<button on:click={sendTost}>callToast</button>
<button on:click={sendShare}>callShare</button>
<button on:click={callConfirm}>sendConfirm</button>
<button on:click={getStorage}>getStorage</button>
<button on:click={setStorage}>setStorage</button>

