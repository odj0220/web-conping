import { buildSchema, graphql } from 'graphql';
import contentJson from '../../../../static/data/content.json';
import celebJson from '../../../../static/data/celeb.json';
import programJson from '../../../../static/data/program.json';
import relationJson from '../../../../static/data/relation.json';
import watchingJson from '../../../../static/data/watching.json';
import bannerJson from '../../../../static/data/banner.json';
import productJson from '../../../../static/data/product.json';
import type { GraphQLSchema } from 'graphql/type/schema';
import type {
  Celeb,
  Product,
  Program,
  VideoContent,
} from '../../../lib/models/backend/backend';
import type { IContent, IProduct } from '../../../global/types';
import { GET } from '../../../lib/_api';
import dayjs from 'dayjs';
import Duration from 'dayjs/plugin/duration.js';
dayjs.extend(Duration);

export async function Graphql(query: string) {
  const schema: GraphQLSchema = buildSchema(`
		type Product {
      id: String!
      name: String!
      brand: String
      price: Int
      discountRate: Int
      image: String
      category: String
      exposed: [[Int]]
      storeUrl: String
      views: Float
		}
		
    type Program {
      id: String!
      title: String!
      description: String,
      banner: String
      thumbnail: String
      regularAiringAt: Float
      airingBeginAt: Float
      airingEndAt: Float
      totalEpisode: Int
		}
		
		type Content {
		  id: ID!
      title: String!
      subtitle: String
      programId: String
      contentType: ContentType
      createDt: Float!
      episode: Int
      description: String
      url: String
      videoId: String
      thumb: String
      program: Program
      currentTime: Float
      duration: Float
      views: Float
		}
		
		type Celeb {
      id: String!
      name: String!
      description: String
      categories: [String]
      banner: String
      thumbnail: String
      follows: [Celeb]
      programs: [Program]
      products: [Product]
		}
		
		enum ContentType {
		  FULL
		  HIGHLIGHT
		  SHORTS
		}
		
        type BannerLink {
		  to: String
		  openBrowser: Boolean
		}
		
		type Banner {
		  title: String
		  imgPath: String
		  link: BannerLink
		}
		
		type MainContent {
		  title: [Title]
		  contents: [Content]
		}
		
		type Title {
		  text: String
		  type: String
		}
		
		type MainSeries {
		  title: [Title]
		  contents: [Content]
		  series: Program
		}
		
		type ContentEdge {
		  node: Content
		  cursor: String
		}
		
		type PageInfo {
      startCursor: String
      hasNextPage: Boolean
    }
    
		type PageContent {
		  totalCount: String
		  edges: [ContentEdge]
		  pageInfo: PageInfo
		}
		
		type MainOrigin {
		  title: [Title]
		  programs: [Program]
		}
		
		enum Order {
		  desc
		  asc
		}
	
		
		type Query {
		  products: [Product]
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
    }
	`);

  const rootValue = {
    getBanners: () => {
      return bannerJson;
    },
    // TODO: api 연동하기
    products: () => {
      return productJson;
    },
    // TODO: api 연동하기
    product: async ({ id }: { id: string }) => {
      return productJson.find((product) => product.id === id);
    },
    contents: async ({ sortField, sortOrder, type }: { sortField: string, sortOrder: 'desc' | 'asc', type: string }) => {
      const sort = setOrderBy(sortField, sortOrder);
      const params = JSON.parse(JSON.stringify({
        type,
        sort,
      }));
      const contents = await GET(`/video-content?${new URLSearchParams(params).toString()}`);
      return contents.map((content: VideoContent) => convertContent(content));
    },
    content: async ({ id }: { id: string }) => {
      const content = await GET(`/video-content/${id}?program=true`);
      return convertContent(content);
    },
    // TODO: api 연동하기
    celebs: () => {
      return celebJson;
    },
    // TODO: api 연동하기
    celeb: ({ id }: { id: string }) => {
      return celebJson.find((celeb) => celeb.id === id);
    },
    programs: async () => {
      const programs = await GET('/program');
      return programs.map((program: Program) => convertProgram(program));
    },
    program: async ({ id }: { id: string }) => {
      const program = await GET(`/program/${id}`);
      return convertProgram(program);
    },
    getProductsByContentId: async ({ id }: { id: string }) => {
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
    },
    // TODO: back api 생성시 업데이트
    getCelebsByContentId: ({ id }: { id: string }) => {
      const celebIds = relationJson
        .filter((relation) => relation.content === id)
        .map((relation) => relation.celeb);
      return celebJson.filter((celeb) => celebIds.includes(celeb.id));
    },
    // TODO: api 연동하기
    getContentsByProductId: ({ id }: { id: string }) => {
      const contentIds = relationJson
        .filter((relation) => relation.product === id)
        .map((relation) => relation.content);
      return contentJson.filter((content) => contentIds.includes(content.id));
    },
    // TODO: api 연동하기
    getCelebsByProductId: ({ id }: { id: string }) => {
      const celebIds = relationJson
        .filter((relation) => relation.product === id)
        .map((relation) => relation.celeb);
      return celebJson.filter((celeb) => celebIds.includes(celeb.id));
    },
    // TODO: back api 생성시 업데이트
    getCelebsByProgramId: ({ id }: { id: string }) => {
      const contents = contentJson
        .filter((content) => content.programId === id)
        .map((content) => content.id);
      const celebIds = relationJson
        .filter((relation) => contents.includes(relation.content))
        .map((relation) => relation.celeb);
      return celebJson.filter((celeb) => celebIds.includes(celeb.id));
    },
    // TODO: api 연동하기
    getProductByCelebId: ({ id }: { id: string }) => {
      const productIds = relationJson
        .filter((relation) => relation.celeb === id)
        .map((relation) => relation.product);
      return productJson.filter((product) => productIds.includes(product.id));
    },
    // TODO: api 연동하기
    getContentsByCelebId: ({ id }: { id: string }) => {
      const contentIds = relationJson
        .filter((relation) => relation.celeb === id)
        .map((relation) => relation.content);
      return contentJson.filter((content) => contentIds.includes(content.id));
    },
    getContentsByProgramId: async ({ id, type }: { id: string; type: string }) => {
      return await getContentsByProgramId(id, type);
    },
    getProgramContentsByContentId: async ({ id }: {id: string}) => {
      const content:VideoContent = await GET(`/video-content/${id}?program=true`);
      const programId = content?.ProgramInfo?.programId;
      if (!programId) {
        return [];
      }
      const contents = await getContentsByProgramId(programId.toString());
      return contents.filter((content: IContent) => content.id !== id).splice(0, 2);
    },
    // TODO: backend 와 연결할때 다시 작업
    getContinueWatching: () => {
      return contentJson
        .filter((content) =>
          watchingJson
            .map((watching) => watching.contentId)
            .includes(content.id),
        )
        .map((content) => {
          const currentTime = watchingJson.find(
            (watching) => watching.contentId === content.id,
          )?.currentTime;
          return {
            ...content,
            currentTime,
            program: programJson.find(
              (program) => program.id === content.programId,
            ),
          };
        });
    },

    getMainContents: async () => {
      const contents = await GET('/video-content?sort=[{views:desc}]&cursor=0&size=2&program=true');
      return {
        title: [
          {
            text: '지금',
          },
          {
            text: '인기있는',
            type: 'primary-30',
          },
          {
            text: '콘텐츠',
          },
        ],
        contents: contents.items.map((content: VideoContent) => convertContent(content)),
      };
    },

    getMainSeries: async () => {
      const programId = '1';
      const response = await GET(`/video-content?sort=[{views:desc}]&programId=${programId}&program=true&cursor=0&size=5`);
      const contents = response.items.map((content: VideoContent) => convertContent(content));
      let series;
      if (contents[0].ProgramInfo) {
        series = convertProgram(contents[0].ProgramInfo.Program);
      }
      return {
        title: [
          {
            text: '뷰티 꿀팁 가득한',
          },
          {
            text: '#랜선뷰티',
            type: 'primary-30',
          },
          {
            text: '모아보기',
          },
        ],
        contents,
        series,
      };
    },

    getMainShorts: async () => {
      const response = await GET('/video-content?sort=[{views:desc}]&type=SHORTS&cursor=0&size=6');
      const shorts = response.items.map((content: VideoContent) => convertContent(content));
      return {
        title: [
          {
            text: '많이 본 쇼츠',
          },
        ],
        contents: shorts,
      };
    },
    getMainOrigin: async () => {
      const response = await GET('/program');
      const programs = response.map((program: Program) => convertProgram(program));
      return {
        title: [
          {
            text: '콜핑 오리지널',
          },
        ],
        programs: programs,
      };
    },
    getMainInfiniteContents: async ({
      first,
      afterCursor,
    }: {
      first: number;
      afterCursor: string;
    }) => {
      const response = await GET(`/video-content?size=${first}&cursor=${afterCursor || 0}&type=FULL,HIGHLIGHT&program=true`);
      const edges = response.items.map((content: VideoContent) => {
        const node = convertContent(content);
        return {
          node,
          cursor: node.id,
        };
      });

      let startCursor = 0;
      if (edges.length > 0) {
        startCursor = edges[edges.length - 1].node.id;
      }
      const hasNextPage = edges.length >= first;

      return {
        totalCount: 0,
        edges,
        pageInfo: {
          startCursor,
          hasNextPage,
        },
      };
    },
  };

  return graphql({
    schema,
    source: query,
    rootValue,
  });
}

const getContentsByProgramId = async (id: string, type?: string) => {
  const response = await GET(`/video-content?programId=${id}&program=true&sort=[{"ProgramInfo": {"episode": "desc"} }]`);
  const contents = response.items.map((content: VideoContent) => convertContent(content));
  return contents
    .filter((content: IContent) => {
      if (!type) {
        return true;
      }
      return content.contentType === type;
    });
};

const setOrderBy = (sortField?: string, sortOrder?: string) => {
  if (!sortField) {
    return ;
  }
  const obj:any = {};
  obj[sortField] = sortOrder || 'asc';
  return JSON.stringify(obj);
};

const getThumbnail = (videoId?: string) => `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

const convertContent = (content?: VideoContent) => {
  if (!content) {
    return ;
  }
  const { id, type, releaseAt, Video, ProgramInfo } = content;
  let program, videoId, duration, thumb, programId;
  if (ProgramInfo?.Program) {
    program = convertProgram(ProgramInfo.Program);
    programId = program?.id;
  }
  if (Video) {
    videoId = Video[0].youtubeVideoId;
    duration = dayjs.duration(Video[0].duration).asSeconds();
    thumb = getThumbnail(videoId || '');
  }

  return JSON.parse(JSON.stringify({
    ...content,
    id: id.toString(),
    programId,
    contentType: type,
    createDt: +dayjs(releaseAt),
    episode: ProgramInfo?.episode,
    videoId,
    duration,
    thumb,
    program,
  }));
};

const convertProgram = (program?: Program) => {
  if (!program) {
    return ;
  }
  const { id, regularAiringAt, airingBeginAt, airingEndAt } = program;
  return {
    ...program,
    id: id.toString(),
    regularAiringAt: regularAiringAt ? +dayjs(regularAiringAt) : 0,
    airingBeginAt: airingBeginAt ? +dayjs(airingBeginAt) : 0,
    airingEndAt: airingEndAt ? +dayjs(airingEndAt) : 0,
  };
};

const convertProduct = (product?: Product, videoContentId?: number) => {
  if (!product) {
    return ;
  }
  const { id, VideoContentProduct } = product;
  let exposed;
  if (VideoContentProduct && videoContentId) {
    const videoContentProduct = VideoContentProduct.find(videoContentProduct => videoContentProduct.videoContentId === videoContentId);
    if (videoContentProduct?.VideoExposureTime) {
      exposed = videoContentProduct.VideoExposureTime.map(videoExposureTime => [(+videoExposureTime.exposedOffsetBeginMs / 1000), (+videoExposureTime.exposedOffsetEndMs / 1000)]);
    }
  }
  return JSON.parse(JSON.stringify({
    ...product,
    id: id.toString(),
    exposed,
  }));
};

const convertCeleb = (celeb?: Celeb) => {
  if (!celeb) {
    return ;
  }
  const { id, backImageUrl, imageUrl, CelebCategory, CelebFollower, CelebProduct } = celeb;
  const categories = CelebCategory;
  const follows = CelebFollower;
  const products = CelebProduct;
  return JSON.parse(JSON.stringify({
    ...celeb,
    id: id.toString(),
    banner: backImageUrl,
    thumbnail: imageUrl,
    categories,
    follows,
    products,
  }));
};
