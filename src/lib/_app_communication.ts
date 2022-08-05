import { goto } from '$app/navigation';
import { guid } from './util';

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

const conpingCallbackListener: Array<(eventName: string, data: any) => void> = [];
const conpingCallback = (callback: any) => {
  const win:any = window;
  conpingCallbackListener.push(callback);
  if (!win['conpingCallback']) {
    win['conpingCallback'] = (callId: string, data: any) => {
      conpingCallbackListener.forEach((listener: (callId: string, data: any) => void) => {
        listener(callId, data);
      });
    };
  }
};

const communicationPromise = (uuid: string) => {
  return new Promise((resolve, reject) => {
    conpingCallback((eventName:string, data: any) => {
      if (uuid === eventName) {
        resolve(data);
      }
    });
  });
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
  win['ConpingInterface'].callToast(message);
};

export const callShare = (type: string, id: string, title?: string) => {
  const win: any = window;
  const uuid = guid();
  win['ConpingInterface'].callShare(JSON.stringify({ type, id, title }), uuid);
  return communicationPromise(uuid);
};

export const callAlert = (message: string, title?: string, subject?: string) => {
  const win: any = window;
  win['ConpingInterface'].callAlert(JSON.stringify({ message, title, subject }));
};

export const callConfirm = (message: string, title?: string, subject?: string) => {
  const win: any = window;
  const uuid = guid();
  win['ConpingInterface'].callConfirm(JSON.stringify({ message, title, subject }), uuid);
  return communicationPromise(uuid);
};

export const getStorage = (key: string) => {
  const win: any = window;
  const uuid = guid();
  win['ConpingInterface'].getStorage(key, uuid);
  return communicationPromise(uuid);
};

export const setStorage = (key: string, value: string) => {
  const win: any = window;
  win['ConpingInterface'].setStorage(JSON.stringify({ key, value }));
};

export const getVersion = () => {
  const win: any = window;
  const uuid = guid();
  win['ConpingInterface'].getVersion(uuid);
  return communicationPromise(uuid);
};

export const copyToClipboard = (text: string) => {
  const win: any = window;
  win['ConpingInterface'].copyToClipboard(text);
};

export const launchTel = async (phoneNumber: string): Promise<boolean> => {
  const win: any = window;
  return await win['flutter_inappwebview'].callHandler('launchTel', phoneNumber);
};

export const launchWeb = async (url: string, headers?: string): Promise<boolean> => {
  const win: any = window;
  return await win['ConpingInterface'].launchWeb(JSON.stringify({ url, headers }));
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
  if (win['flutter_inappwebview']) {
    win['flutter_inappwebview'].callHandler('onSettingTap');
    return;
  }
  goto('/settings');
};

export const onAndroidExit = () => {
  const win: any = window;
  win['flutter_inappwebview'].callHandler('onAndroidExit');
};

export const onInitialized = (callback: () => void) => {
  const win: any = window;
  const interval = setInterval(() => {
    if (win['flutter_inappwebview']) {
      clearInterval(interval);
      win['flutter_inappwebview'].callHandler('onInitialized');
      callback();
    }
  }, 200);
};
