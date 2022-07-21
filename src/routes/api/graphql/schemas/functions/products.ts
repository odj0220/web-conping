import productJson from '../../../../../../static/data/product.json';
import relationJson from '../../../../../../static/data/relation.json';
import celebJson from '../../../../../../static/data/celeb.json';
import type { Product, VideoContent } from '$lib/models/backend/backend';
import { GET } from '../../../../../lib/_api';
import type { IProduct } from '../../../../../global/types';
import { convertProduct } from './converts';

export const products = ({ sortField, sortOrder }: {sortField: string, sortOrder: string}) => {
  return productJson.map(product => {
    const releations = relationJson.filter(relation => relation.product === product.id);
    const celebs = celebJson.filter(celeb => releations.map(r => r.celeb).includes(celeb.id));
    const contents = [];
    const result = {
      ...product,
      celebs: celebJson.filter(celeb => releations.map(r => r.celeb).includes(celeb.id)),
      content: [],
      releatedItems: [
        {
          thumbnail: celebs[0].thumbnail,
          title: celebs[0].name,
          type: Celeb,
          id: celebs[0].id,
        },
        {
          thumbnail: contents[0].thumbnail,
          title: contents[0].name,
          type: Content,
          id: contents[0].id,
        },
      ],
    };
    return result;
  });
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
