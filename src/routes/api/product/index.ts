import { list } from './_product';

/**
 * /api/product 호출시 트렌드 사이트의 신상품 목록을 리턴
 * @returns {Promise<{body: Product[]}>}
 */
export async function get() {
  const productList = await list();
  return {
    body: productList,
  };
}
