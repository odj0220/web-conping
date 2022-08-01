import { clientStorage } from './_client_storage';

const STORAGE_KEY = 'continueWatching';
export const getContinueWatchingList = async () => {
  const continueWatchingString = await clientStorage().get(STORAGE_KEY);
  const continueWatchingList = continueWatchingString ? JSON.parse(continueWatchingString) : [];
  return continueWatchingList;
};

export const setContents = async (content: any) => {
  const list = await getContinueWatchingList();
  const findIndex = list.findIndex((contentItem: any) => contentItem.id === content.id);
  if (findIndex < 0) {
    list.unshift(content);
  } else {
    // list[findIndex] = content;
    list.splice(findIndex, 1);
    list.unshift(content);
  }
  clientStorage().set(STORAGE_KEY, JSON.stringify(list));
};
