import { product } from './_product';
import type {RequestHandler} from '@sveltejs/kit';

/**
 * /api/product/{id} 호출시 상품 상세 정보 리턴
 * @param {Record<string, string>} params
 * @returns {Promise<{body: any}>}
 */
export const get:RequestHandler = async ({ params }) => {
  const response: any = await product(params.id);
  return {
    body: response
  };
}
