import { buildSchema, graphql } from 'graphql';
import type { GraphQLSchema } from 'graphql/type/schema';
import { product, products, getProductsByContentId, getProductByCelebId } from './controller/products';
import { getBanners } from './controller/banner';
import {
  content,
  contents,
  getContentsByProductId,
  getProgramContentsByContentId,
  getMainContents,
  getMainInfiniteContents,
  getYoutubeContentsByCelebId,
} from './controller/contents';
import { celebs, celeb, getCelebsByContentId, getCelebsByProductId, getCelebsByProgramId, getInfiniteCelebs } from './controller/celebs';
import { program, programs } from './controller/program';
import { getContinueWatching } from './controller/watching';
import { getMainSeries } from './controller/series';
import { getMainShorts } from './controller/shorts';
import { getMainOrigin } from './controller/origins';
import { socials, getSocialsByCelebId } from './controller/social';
import { categories } from './controller/categories';

import GRAPH_TYPES from './schemas/types';
import GRAPH_ENUMS from './schemas/enums';

import dayjs from 'dayjs';
import Duration from 'dayjs/plugin/duration.js';
import { contentsByProgramId, contentsByCelebId, shortsByCelebId, productsByCelebId } from './controller/util';
dayjs.extend(Duration);

export async function Graphql(query: string) {
  const schema: GraphQLSchema = buildSchema(`
    ${GRAPH_TYPES}	
    ${GRAPH_ENUMS}
    type Query {
      products(order: ProductOrder, category: Int, limit: Int, page: Int): PageProduct
      product(id:ID!): Product
      contents(sortField: String, sortOrder: Order, type:ContentType, limit: Int, afterCursor: Int, celeb: Int, program: Int): PageContent
      content(id:ID!): Content
      celebs: [Celeb]
      celeb(id:ID!): Celeb
      programs: [Program]
      program(id:ID!): Program
      socials: [Social]
      categories(type: String): [Category]
      getProductsByContentId(id:ID!): [Product]
      getCelebsByContentId(id:ID!): [Celeb]
      getContentsByProgramId(id:ID!, type:ContentType): [Content]
      getContentsByProductId(id:ID!): [Content]
      getProductsByCelebId(id: ID!, cursor: Int, limit: Int): PageProduct
      getCelebsByProductId(id:ID!): [Celeb]
      getCelebsByProgramId(id:ID!): [Celeb]
      getProductByCelebId(id:ID! limit: Int): [Product]
      getContentsByCelebId(id:ID!, cursor: Int, limit: Int, shorts: Boolean): PageContent
      getShortsByCelebId(id:ID!, cursor: Int, limit: Int, shorts: Boolean): PageContent
      getProductsByCategory(category:String!): [Product]
      getContinueWatching: [Content]
      getProgramContentsByContentId(id:ID!): [Content]
      getSocialsByCelebId(id: ID!, type: SocialType): [Social]
     
      getBanners: [Banner]
      getMainContents: MainContent
      getMainSeries: MainSeries
      getMainShorts: MainContent
      getMainInfiniteContents(limit: Int, cursor: String): PageContent
      getMainOrigin: MainOrigin
      
      getInfiniteCelebs(first: Int, afterCursor: String): PageCeleb
      getYoutubeContentsByCelebId(id: ID!): YoutubeContents
  }`);

  const rootValue = {
    getBanners,
    // TODO: api 연동하기
    products,
    // TODO: api 연동하기
    product,
    contents,
    content,
    // TODO: api 연동하기
    celebs,
    // TODO: api 연동하기
    celeb,
    programs,
    program,

    socials,

    categories,


    getSocialsByCelebId,

    getProductsByContentId,
    // TODO: back api 생성시 업데이트
    getCelebsByContentId,
    // TODO: api 연동하기
    getContentsByProductId,
    // TODO: api 연동하기
    getCelebsByProductId,
    // TODO: back api 생성시 업데이트
    getCelebsByProgramId,
    // TODO: api 연동하기
    getProductByCelebId,
    // TODO: api 연동하기
    getShortsByCelebId: async ({ id, cursor, limit }: {id: string; cursor: number; limit: number}) => {
      return await shortsByCelebId(id, cursor, limit);
    },
    getContentsByCelebId: async ({ id, cursor, limit }: {id: string; cursor: number; limit: number}) => {
      return await contentsByCelebId(id, cursor, limit);
    },
    getProductsByCelebId: async ({ id, limit, cursor }: {id: string; limit:number; cursor: number}) => {
      return await productsByCelebId(id, limit, cursor);
    },
    getContentsByProgramId: async ({ id, type }: {id: string, type: string}) => {
      return await contentsByProgramId(id, type);
    },
    getProgramContentsByContentId,
    // TODO: backend 와 연결할때 다시 작업
    getContinueWatching,

    getMainContents,
    getMainSeries,
    getMainShorts,
    getMainOrigin,
    getMainInfiniteContents,

    getInfiniteCelebs,
    getYoutubeContentsByCelebId,
  };

  return graphql({
    schema,
    source: query,
    rootValue,
  });
}
