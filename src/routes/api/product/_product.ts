import { trendApi } from '$lib/_api_trend';
import type { Product } from '$lib/models/interfaces/product.interface';

/**
 * trend 사이트에 노출되는 신상품 목록을 리턴
 * @returns {Promise<Product[]>}
 */
export async function list() {
  const response = await trendApi('post', 'api/brand/latest/product');
  const products: Product[] = response.content;

  return products;
}

/**
 * productID 를 이용하여 상품 상세정보 및 유사상품 정보를 리턴
 * @param {string} id
 * @returns {Promise<Product>}
 */
export async function product(id: string) {
  const response = await trendApi('get', `api/brand/product/${id}`);
  const similar = await trendApi('get', `api/brand/product/similar/image/${id}`);
  const result: Product = response;
  result['similar'] = similar;

  return result;
}
