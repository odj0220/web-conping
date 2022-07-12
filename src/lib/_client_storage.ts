const localstorage = () => {
  const get = (key:string) => window.localStorage.getItem(key);
  const set = (key: string, value: string) => window.localStorage.setItem(key, value);
  return { get, set };
};

const appStorage = () => {
  const win: any = window;
  const get = (key:string) => win['flutter_inappwebview'].callHandler('getStorage', key);
  const set = (key: string, value: string) => win['flutter_inappwebview'].callHandler('setStorage', { key, value });
  return { get, set };
};

export const clientStorage = () => {
  const win: any = window;
  if (win['flutter_inappwebview']) {
    return appStorage();
  }
  return localstorage();
};
