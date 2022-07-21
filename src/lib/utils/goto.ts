import { goto } from '$app/navigation';

export const gotoPrograms = (id: string) => {
  goto(`/programs/${id}`);
};

export const gotoContents = (id: string) => {
  goto(`/contents/${id}`);
};

export const gotoShorts = (id: string) => {
  goto(`/shorts/${id}`);
};
