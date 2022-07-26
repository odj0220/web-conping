import { GET } from '../../../../lib/_api';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const categories = async ({ type }: {type?: string}) => {
  const params: any = {
    sort: JSON.stringify([{ 'id': 'asc' }]),
    cursor: 0,
  };

  if (type) {
    params['type'] = type;
  }

  const data = await GET('/category', { method: 'GET', params });

  return data.map((cate: any) => {
    return {
      id: cate.id,
      name: cate.name,
      fontColor: cate.fontColor,
      backColor: cate.backColor,
    };
  });
};
