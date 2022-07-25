import productJson from '../../../../../static/data/product.json';
import relationJson from '../../../../../static/data/relation.json';
import celebJson from '../../../../../static/data/celeb.json';
import contentsJson from '../../../../../static/data/content.json';
import type { Product, VideoContent } from '$lib/models/backend/backend';
import type { IProduct } from '../../../../global/types';
import { GET } from '$lib/_api';
import { convertProduct } from './util';
import { getParams } from '../../../../lib/utils/common';
import { getThumbnail } from './util';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const products = async ({ order, category }: {order: string, category: string}) => {
  const data: any[] = productJson;

  const query: any = {
    sort: JSON.stringify([{ 'id': 'asc' }]),
    videoContent: true,
    celeb: true,
    size: 2,
  };

  const products = await getProductsFromBackend(query);

  return products.elements.map((product: any) => {
    const relatedItems = [];
    /* Generate Contents */
    const contents = product.VideoContentProduct.map((p: any) => {
      const thumb = getThumbnail(p.VideoContent.Video[0].youtubeVideoId);
      return {
        id: p.VideoContent.id,
        title: p.VideoContent.title,
        subtitle: p.VideoContent.subtitle,
        description: p.VideoContent.description,
        thumb,
      };
    });

    const celebs = product.CelebProduct.map((c: any) => {
      return {
        id: c.Celeb.id,
        name: c.Celeb.name,
        thumbnail: c.Celeb.image,
      };
    });

    if (celebs.length) {
      relatedItems.push({
        thumbnail: celebs[0].thumbnail,
        title: celebs[0].name,
        type: 'Celeb',
        id: celebs[0].id,
      });
    }

    if (contents.length) {
      relatedItems.push({
        thumbnail: contents[0].thumb,
        title: contents[0].title,
        type: 'Content',
        id: contents[0].id,
      });
    }

    return {
      id: product.id,
      name: product.name,
      brand: 'No Brand',
      price: product.price,
      discountRate: product.discountRate,
      image: product.image,
      storeUrl: product.storeUrl,
      views: product.views,
      createDt: +new Date(product.createdAt),
      contents,
      celebs,
      relatedItems,
    };
  });

  // data = data.map((product) => {
  //   const relations: any[] = relationJson.filter((r) => r.product === product.id);
  //   const celebs: any[] = celebJson.filter((celeb) => relations.find((r) => r.celeb === celeb.id));
  //   const contents: any[] = contentsJson.filter((content) => relations.find((r) => r.content === content.id));
  //
  //   return {
  //     ...product,
  //     celebs,
  //     contents,
  //     relatedItems: [
  //       {
  //         thumbnail: celebs[0].thumbnail,
  //         title: celebs[0].name,
  //         type: 'Celeb',
  //         id: celebs[0].id,
  //       },
  //       {
  //         thumbnail: contents[0].thumb,
  //         title: contents[0].title,
  //         type: 'Content',
  //         id: contents[0].id,
  //       },
  //     ],
  //   };
  // });
  //
  //
  // if (category) {
  //   data = data.filter((product) => product.category === category);
  // }
  //
  // if (order) {
  //   switch (order) {
  //   case 'latest':
  //     data.sort((dataA, dataB) => dataB.createDt - dataA.createDt);
  //     break;
  //   case 'popularity':
  //     data.sort((dataA, dataB) => dataB.views - dataA.views);
  //     break;
  //   case 'highPrice':
  //     data.sort((dataA, dataB) => dataB.price - dataA.price);
  //     break;
  //   case 'lowPrice':
  //     data.sort((dataA, dataB) => dataA.price - dataB.price);
  //     break;
  //   case 'alphabetical':
  //     data.sort((dataA, dataB) => {
  //       if (dataA.name > dataB.name) {
  //         return -1;
  //       } else if (dataB.name > dataA.name) {
  //         return 1;
  //       } else {
  //         return 0;
  //       }
  //     });
  //     break;
  //   default:
  //     data.sort((dataA, dataB) => dataB.createDt - dataA.createDt);
  //     break;
  //   }
  // }
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

export const getProductByCelebId = ({ id, limit }: { id: string, limit: number }) => {
  const productIds = relationJson
    .filter((relation: any) => relation.celeb === id)
    .map((relation: any) => relation.product);

  let products = productJson.filter((product) => productIds.includes(product.id));

  if (limit) {
    products = products.splice(0, limit);
  }
  return products;
};

async function getProductsFromBackend(params?: {size?: number; page?: number; sort?: string; videoContent?: boolean; productCategoryId: number; celeb: boolean}) {
  let queries = '';

  if (params) {
    queries = getParams(params);
  }

  const response = await GET(`/product${queries ? `?${queries}` : ''}`);
  return response;

  // if (response.ok) {
  //   const products = await response.json();
  //   return products;
  // }
  //
  // throw { message: 'Something went wrong' };
}
