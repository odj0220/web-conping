import { buildSchema, graphql } from 'graphql';
import type { GraphQLSchema } from 'graphql/type/schema';
import { product, products, getProductsByContentId, getProductByCelebId } from './schemas/functions/products';
import { getBanners } from './schemas/functions/banner';
import { content, contents, getContentsByProductId, getProgramContentsByContentId, getContentsByCelebId, getMainContents, getContentsByProgramId, getMainInfiniteContents } from './schemas/functions/contents';
import { celebs, celeb, getCelebsByContentId, getCelebsByProductId, getCelebsByProgramId } from './schemas/functions/celobs';
import { program, programs } from './schemas/functions/program';
import { getContinueWatching } from './schemas/functions/watching';
import { getMainSeries } from './schemas/functions/series';
import { getMainShorts } from './schemas/functions/shorts';
import { getMainOrigin } from './schemas/functions/origins';

import GRAPH_TYPES from './schemas/types';
import GRAPH_ENUMS from './schemas/enums';

import dayjs from 'dayjs';
import Duration from 'dayjs/plugin/duration.js';
dayjs.extend(Duration);

export async function Graphql(query: string) {
  const schema: GraphQLSchema = buildSchema(`
    ${GRAPH_TYPES}	
    ${GRAPH_ENUMS}
    type Query {
      products(order: ProductOrder, category: String): [Product]
      product(id:ID!): Product
      contents(sortField: String, sortOrder: Order, type:ContentType): [Content]
      content(id:ID!): Content
      celebs: [Celeb]
      celeb(id:ID!): Celeb
      programs: [Program]
      program(id:ID!): Program
      getProductsByContentId(id:ID!): [Product]
      getCelebsByContentId(id:ID!): [Celeb]
      getContentsByProgramId(id:ID!, type:ContentType): [Content]
      getContentsByProductId(id:ID!): [Content]
      getCelebsByProductId(id:ID!): [Celeb]
      getCelebsByProgramId(id:ID!): [Celeb]
      getProductByCelebId(id:ID!): [Product]
      getContentsByCelebId(id:ID!): [Content]
      getProductsByCategory(category:String!): [Product]
      getContinueWatching: [Content]
      getProgramContentsByContentId(id:ID!): [Content]
     
      getBanners: [Banner]
      getMainContents: MainContent
      getMainSeries: MainSeries
      getMainShorts: MainContent
      getMainInfiniteContents(first: Int, afterCursor: String): PageContent
      getMainOrigin: MainOrigin
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
    getContentsByCelebId,
    getContentsByProgramId,
    getProgramContentsByContentId,
    // TODO: backend 와 연결할때 다시 작업
    getContinueWatching,

    getMainContents,
    getMainSeries,
    getMainShorts,
    getMainOrigin,
    getMainInfiniteContents,
  };

  return graphql({
    schema,
    source: query,
    rootValue,
  });
}
