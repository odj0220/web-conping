import { getStorage, setStorage } from './_app_communication';

const localstorage = () => {
  const get = (key:string) => window.localStorage.getItem(key);
  const set = (key: string, value: string) => window.localStorage.setItem(key, value);
  return { get, set };
};

const appStorage = () => {
  const get = async (key:string) => await getStorage(key);
  const set = (key: string, value: string) => setStorage(key, value);
  return { get, set };
};

export const clientStorage = () => {
  const win: any = window;
  if (win['flutter_inappwebview']) {
    return appStorage();
  }
  return localstorage();
};
