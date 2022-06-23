import { Graphql } from './_graphql';
import type {RequestHandler} from '@sveltejs/kit';

/**
 * graphql query 를 이용하여 데이터를 리턴
 * @param {Request} request
 * @returns {Promise<{body: any}>}
 */
export const post:RequestHandler = async ({request}) => {
  const query = await request.json(); // or .json(), or .text(), etc
  const result: any = await Graphql(query.query);
  return {
    body: result
  };
}
