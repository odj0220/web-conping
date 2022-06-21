import { trendApi } from '$lib/_api_trend';
import type {Product} from '$lib/models/interfaces/product.interface';

export async function list() {
    const response = await trendApi('post', `api/brand/latest/product`);
    const products: Product[] = response.content;

    return products;
}

export async function product(id: string) {
    const response = await trendApi('get', `api/brand/product/${id}`);
    const similar = await trendApi('get', `api/brand/product/similar/image/${id}`);
    const result: Product = response;
    result['similar'] = similar;

    return result;
}
