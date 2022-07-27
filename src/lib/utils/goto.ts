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
  if (document.referrer) {
    window.history.go(-1);
  } else {
    goto('/');
  }
};
