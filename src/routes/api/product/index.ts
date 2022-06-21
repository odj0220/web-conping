import { list } from './_product';
export async function get() {
  const productList = await list();
  return {
    body: productList,
  };
}
