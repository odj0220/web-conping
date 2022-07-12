import { clientStorage } from './_client_storage';

const STORAGE_KEY = 'continueWatching';
export const getList = () => {
  const continueWatchingString = clientStorage().get(STORAGE_KEY);
  const continueWatchingList = continueWatchingString ? JSON.parse(continueWatchingString) : [];
  return continueWatchingList;
};

export const setContents = (content: any) => {
  const list = getList();
  const findIndex = list.findIndex((contentItem: any) => contentItem.id === content.id);
  if (findIndex < 0) {
    list.push(content);
  } else {
    list[findIndex] = content;
  }
  clientStorage().set(STORAGE_KEY, JSON.stringify(list));
};
