const onMessageFormAppListener: Array<(eventName: string, data: any) => void> = [];
const onMessageFormAppCb = (callback: any) => {
  const win:any = window;
  onMessageFormAppListener.push(callback);
  if (!win['onMessageFromApp']) {
    win['onMessageFromApp'] = (eventName: string, data: any) => {
      onMessageFormAppListener.forEach((listener: (eventName: string, data: any) => void) => {
        listener(eventName, data);
      });
    };
  }
};

/**
 * eventType 에 따른 return을 받는 함수
 * @param event
 */
export const onMessageFromApp = (event: string) => {
  let callback: any;
  onMessageFormAppCb((eventName:string, data: any) => {
    if (event === eventName) {
      callback(data);
    }
  });
  return (cb: any) => {
    callback = cb;
  };
};

export const callToast = (message: string) => {
  const win: any = window;
  win['flutter_inappwebview'].callHandler('callToast', message);
};

export const callShare = async (type: string, id: string, title?: string) => {
  const win: any = window;
  return await win['flutter_inappwebview'].callHandler('callShare', JSON.stringify({ type, id, title }));
};

export const callAlert = (message: string, title?: string, subject?: string) => {
  const win: any = window;
  win['flutter_inappwebview'].callHandler('callAlert', JSON.stringify({ message, title, subject }));
};

export const callConfirm = async (message: string, title?: string, subject?: string) => {
  const win: any = window;
  return await win['flutter_inappwebview'].callHandler('callConfirm', JSON.stringify({ message, title, subject }));
};

export const getStorage = async (key: string) => {
  const win: any = window;
  return await win['flutter_inappwebview'].callHandler('getStorage', key);
};

export const setStorage = (key: string, value: string) => {
  const win: any = window;
  win['flutter_inappwebview'].callHandler('setStorage', JSON.stringify({ key, value }));
};

export const getVersion = async (): Promise<string> => {
  const win: any = window;
  return await win['flutter_inappwebview'].callHandler('getVersion');
};

export const copyToClipboard = (text: string) => {
  const win: any = window;
  win['flutter_inappwebview'].callHandler('copyToClipboard', text);
};

export const launchTel = async (phoneNumber: string): Promise<boolean> => {
  const win: any = window;
  return await win['flutter_inappwebview'].callHandler('launchTel', phoneNumber);
};

export const launchWeb = async (url: string, headers?: string): Promise<boolean> => {
  const win: any = window;
  return await win['flutter_inappwebview'].callHandler('launchWeb', JSON.stringify({ url, headers }));
};

export const launchSystemNotification = () => {
  const win: any = window;
  win['flutter_inappwebview'].callHandler('launchSystemNotification');
};

export const getUser = async () => {
  const win: any = window;
  return await win['flutter_inappwebview'].callHandler('getUser');
};

export const getNotch = async () => {
  const win: any = window;
  return await win['flutter_inappwebview'].callHandler('getNotch');
};

export const onSettingTap = () => {
  const win: any = window;
  win['flutter_inappwebview'].callHandler('onSettingTap');
};

export const onAndroidExit = () => {
  const win: any = window;
  win['flutter_inappwebview'].callHandler('onAndroidExit');
};

export const onInitialized = (callback: () => void) => {
  const win: any = window;
  let initCheck = false;
  const interval = setInterval(() => {
    if (initCheck) {
      clearInterval(interval);
    }
    if (win['flutter_inappwebview']) {
      win['flutter_inappwebview'].callHandler('onInitialized');
      initCheck = true;
      callback();
    }
  }, 200);
};
