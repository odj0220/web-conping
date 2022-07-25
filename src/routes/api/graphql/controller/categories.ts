import { getParams } from '$lib/utils/common';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const categories = async ({ type }: {type?: string}) => {
  const query: any = {
    sort: JSON.stringify([{ 'id': 'asc' }]),
    cursor: 0,
  };

  if (type) {
    query['type'] = type;
  }

  const data = await getCategoriesFromBackend(query);

  return data.map((cate: any) => {
    return {
      id: cate.id,
      name: cate.name,
      fontColor: cate.fontColor,
      backColor: cate.backColor,
    };
  });
};

export const getCategoriesFromBackend = async (params: any) => {
  let queries = '';

  if (params) {
    queries = getParams(params);
  }

  const response = await fetch(`${BASE_URL}/category${queries ? `?${queries}` : ''}`);

  if (response.ok) {
    const products = await response.json();
    return products;
  }

  throw { message: 'Something went wrong' };
};
