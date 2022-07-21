import productJson from '../../../../../../static/data/product.json';
import relationJson from '../../../../../../static/data/relation.json';
import celebJson from '../../../../../../static/data/celeb.json';
import contentsJson from '../../../../../../static/data/content.json';
import type { Product, VideoContent } from '$lib/models/backend/backend';
import { GET } from '../../../../../lib/_api';
import type { IProduct } from '../../../../../global/types';
import { convertProduct } from './converts';

export const products = ({ sortField, sortOrder, category }: {sortField: string, sortOrder: string; category: string}) => {
  let data: any[] = productJson;

  if (category) {
    data = data.map((product) => product.category === category);
  }

  const result = data.map((product) => {
    const relations: any[] = relationJson.filter((r) => r.product === product.id);
    const celebs: any[] = celebJson.filter((celeb) => relations.find((r) => r.celeb === celeb.id));
    const contents: any[] = contentsJson.filter((content) => relations.find((r) => r.content === content.id));
    return {
      ...product,
      celebs,
      contents,
      releatedItems: [
        {
          thumbnail: celebs[0].thumbnail,
          title: celebs[0].name,
          type: 'Celeb',
          id: celebs[0].id,
        },
        {
          thumbnail: contents[0].thumbnail,
          title: contents[0].name,
          type: 'Content',
          id: contents[0].id,
        },
      ],
    };
  });

  return result;
};

export const product = async ({ id }: {id: string}) => {
  return productJson.find((product) => product.id === id);
};

export const getProductsByContentId = async ({ id }: { id: string }) => {
  const content:VideoContent = await GET(`/video-content/${id}?product=true`);
  const products: IProduct[] = [];
  if (content.VideoContentProduct) {
    content.VideoContentProduct.forEach(videoContentProduct => {
      const product: IProduct | undefined = convertProduct(videoContentProduct.Product, +id);
      if (product) {
        products.push(product);
      }
    });
  }
  return products;
};

export const getProductByCelebId = ({ id }: { id: string }) => {
  const productIds = relationJson
    .filter((relation: any) => relation.celeb === id)
    .map((relation: any) => relation.product);
  return productJson.filter((product) => productIds.includes(product.id));
};
