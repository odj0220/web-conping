import { goto } from '$app/navigation';

export const gotoPrograms = (id: string) => {
  goto(`/programs/${id}`);
};

export const gotoContents = (id: number) => {
  goto(`/contents/${id}`);
};

export const gotoShorts = (id: number) => {
  goto(`/shorts/${id}`);
};

export const gotoCelebs = (id: string) => {
  goto(`/celebs/${id}`);
};

export const goBack = () => {
  historyBack(-1, () => goto('/'));
};

export const goPath = (path: string) => {
  goto(path);
};

export const historyBack = (count: number, fallback: any) => {
  let hasHistory = false;
  window.history.go(count);

  const stateChange = (e: any) => hasHistory = true;
  window.addEventListener('popstate', stateChange);

  setTimeout(function() {
    if (!hasHistory) {
      fallback();
      window.removeEventListener('popstate', stateChange);
    }
  }, 200);
};
