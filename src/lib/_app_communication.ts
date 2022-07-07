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

export const callShare = () => {
  const win: any = window;
  win['flutter_inappwebview'].callHandler('callShare');
};


export const callConfirm = (message: string, callback: any) => {
  const win: any = window;
  win['flutter_inappwebview'].callHandler('callConfirm')
    .then((boolean: boolean) => callback(boolean));
};
