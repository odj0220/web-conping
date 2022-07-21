import productJson from '../../../../../static/data/product.json';
import relationJson from '../../../../../static/data/relation.json';
import type { Product, VideoContent } from '../../../../lib/models/backend/backend';
import { GET } from '../../../../lib/_api';
import type { IProduct } from '../../../../global/types';
import { convertProduct } from './util';

export const products = () => productJson;

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
