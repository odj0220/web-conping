import { goto } from '$app/navigation';

export const gotoPrograms = (id: number) => {
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
