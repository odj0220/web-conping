<script type="ts">
  import { callToast, callShare, callConfirm } from '$lib/_app_communication';
  import { getList, setContents } from '$lib/_continue_watching';

  let contentList: string;


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
  async function getStorage() {
    const contents = await getList();
    contentList = JSON.stringify(contents);
  }
  function setStorage() {
    setContents({ id: '123', name: 'test' });
  }
</script>

<button on:click={sendTost}>callToast</button>
<button on:click={sendShare}>callShare</button>
<button on:click={sendConfirm}>callConfirm</button>
<button on:click={getStorage}>getStorage</button>
<button on:click={setStorage}>setStorage</button>

<textarea>
    {contentList}
</textarea>

<style>
    button {
        background: #ccc;
    }
    textarea {
        background: #fff;
    }
</style>
