<script type="ts">
  import { callToast, callShare, callConfirm, getStorage, setStorage, getVersion, copyToClipboard, launchTel, launchWeb } from '$lib/_app_communication';

  async function sendConfirm() {
    const boolean = await callConfirm('오키 할래 안할래?');
    alert(boolean);
  }
  async function callGetStorage() {
    const storage = await getStorage('test');
    alert(storage);
  }
  async function callGetVersion() {
    const version = await getVersion();
    const { major, minor, build } = version ? JSON.parse(version) : { major: 0, minor: 0, build: 0 };
    alert(`${major}.${minor}.${build}`);
  }
</script>

<button on:click={callToast('토스트 전송')}>callToast('토스트 전송')</button>
<button on:click={callShare(['카카오', 'https://kakao.com'])}>callShare(['카카오', 'https://kakao.com'])</button>
<button on:click={sendConfirm}>callConfirm('오키 할래 안할래?')</button>
<button on:click={callGetStorage}>getStorage('test')</button>
<button on:click={setStorage('test', '얄리얄리 얄라셩 얄라리 얄라')}>setStorage('test', '얄리얄리 얄라셩 얄라리 얄라')</button>
<button on:click={callGetVersion}>getVersion</button>
<button on:click={copyToClipboard('텍스트를 복사해 주세요')}>copyToClipboard('텍스트를 복사해 주세요')</button>
<button on:click={launchTel('01026280071')}>launchTel('01026280071')</button>
<button on:click={launchWeb('https://naver.com')}>launchWeb('https://naver.com')</button>


<style>
    button {
        background: #ccc;
        margin: 3px;
        padding: 5px;
    }

</style>
