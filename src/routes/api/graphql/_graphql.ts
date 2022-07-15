import { buildSchema, graphql } from 'graphql';
import contentJson from '../../../../static/data/content.json';
import celebJson from '../../../../static/data/celeb.json';
import programJson from '../../../../static/data/program.json';
import relationJson from '../../../../static/data/relation.json';
import watchingJson from '../../../../static/data/watching.json';
import bannerJson from '../../../../static/data/banner.json';
import type { GraphQLSchema } from 'graphql/type/schema';
import type {
  Celeb,
  CelebProduct,
  Product,
  Program, ProgramInfo,
  VideoContent, VideoContentCast,
  VideoContentProduct,
} from '../../../lib/models/backend/backend';
import type { ICeleb, IContent, IProduct } from '../../../global/types';
import { GET } from '../../../lib/_api';

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
		
		type Banner {
		  title: String
		  imgPath: String
		  link: String
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
    }
	`);

  const rootValue = {
    getBanners: () => {
      return bannerJson;
    },
    products: async () => {
      const products = await GET('/product');
      return products.map((product:Product) => convertProduct(product));
    },
    product: async ({ id }: { id: string }) => {
      const product = await GET(`/product/${id}`);
      return convertProduct(product);
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
      const content = await GET(`/video-content/${id}`);
      return convertContent(content);
    },
    celebs: async () => {
      const celebs = await GET('/celeb');
      return celebs.map((celeb: Celeb) => convertCeleb(celeb));
    },
    celeb: async ({ id }: { id: string }) => {
      const celeb = await GET(`/celeb/${id}`);
      return convertCeleb(celeb);
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
    getContentsByProductId: async ({ id }: { id: string }) => {
      const product = await GET(`/product/${id}`);
      let contents: IContent[] = [];
      if (product.VideoContentProduct) {
        contents = product.VideoContentProduct.map((videoContentProduct: VideoContentProduct) => convertContent(videoContentProduct.VideoContent));
      }
      return contents;
    },
    getCelebsByProductId: async ({ id }: { id: string }) => {
      const product: Product = await GET(`/product/${id}`);
      let celebs: ICeleb[] = [];
      if (product.CelebProduct) {
        celebs = product.CelebProduct.map((celebProduct: CelebProduct) => convertCeleb(celebProduct.Celeb));
      }
      return celebs;
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
    getProductByCelebId: async ({ id }: { id: string }) => {
      const celeb: Celeb = await GET(`/celeb/${id}`);
      let products: IProduct[] = [];
      if (celeb.CelebProduct) {
        products = celeb.CelebProduct.map((celebProduct: CelebProduct) => convertProduct(celebProduct.Product));
      }
      return products;
    },
    getContentsByCelebId: async ({ id }: { id: string }) => {
      const celeb: Celeb = await GET(`/celeb/${id}`);
      let contents: IContent[] = [];
      if (celeb.VideoContentCast) {
        contents = celeb.VideoContentCast.map((videoContentCast: VideoContentCast) => convertContent(videoContentCast.VideoContent));
      }
      return contents;
    },
    getContentsByProgramId: async ({ id, type }: { id: string; type: string }) => {
      return getContentsByProgramId(id, type);
    },
    getProgramContentsByContentId: async ({ id }: {id: string}) => {
      const content:VideoContent = await GET(`/video-content/${id}`);
      const programId = content?.ProgramInfo?.programId;
      if (!programId) {
        return [];
      }
      const contents = await getContentsByProgramId(programId.toString());
      return contents.filter(content => content.id !== id);
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
      const contents = await GET('/video-content?sort={views:desc}');
      return {
        title: [
          {
            text: '지금',
          },
          {
            text: '인기있는',
            type: 'primary-90',
          },
          {
            text: '영상',
          },
        ],
        contents: contentJson.slice(0, 2).map(content => {
          return {
            ...content,
            program: programJson.find(
              (program) => program.id === content.programId,
            ),
          };
        }),
      };
    },
    getMainSeries: () => {
      const programId = 'programId4';
      const contents = contentJson
        .filter((content) => content.programId === programId)
        .filter((_, index) => index < 5)
        .map((content) => {
          return {
            ...content,
            program: programJson.find((program) => program.id === content.programId),
          };
        });
      const series = programJson.find((program) => program.id === programId);
      return {
        title: [
          {
            text: '뷰티 꿀팁 가득한',
          },
          {
            text: '#랜선뷰티',
            type: 'primary-20',
          },
          {
            text: '모아보기',
          },
        ],
        contents,
        series,
      };
    },
    getMainShorts: () => {
      return {
        title: [
          {
            text: '많이 본 쇼츠',
          },
        ],
        contents: contentJson
          .filter((content) => content.contentType === 'SHORTS')
          .slice(0, 6),
      };
    },

    getMainInfiniteContents: ({
      first,
      afterCursor,
    }: {
      first: number;
      afterCursor: string;
    }) => {
      const data = contentJson;
      let afterIndex = 0;
      if (afterCursor) {
        const nodeIndex = data.findIndex((datum) => datum.id === afterCursor);
        if (nodeIndex >= 0) {
          afterIndex = nodeIndex + 1;
        }
      }
      const slicedData = data.slice(afterIndex, afterIndex + first);
      const edges = slicedData.map((node) => ({
        node: {
          ...node,
          program: programJson.find((program) => program.id === node.programId),
        },
        cursor: node.id,
      }));
      let startCursor = undefined;
      if (edges.length > 0) {
        startCursor = edges[edges.length - 1].node.id;
      }
      const hasNextPage = data.length > afterIndex + first;

      return {
        totalCount: data.length,
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
  const program: Program = await GET(`/program/${id}`);
  const contents: IContent[] = [];
  if (program?.ProgramInfo) {
    program?.ProgramInfo.forEach((programInfo: ProgramInfo) => {
      if (programInfo.VideoContent) {
        programInfo.VideoContent.forEach((videoContent: VideoContent) => {
          contents.push(convertContent(videoContent));
        });
      }
    });
  }
  return contents.filter(content => {
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
  const { id, programInfoId, type, releaseAt, Video, ProgramInfo } = content;
  let program, videoId, duration, thumb;
  if (ProgramInfo) {
    program = ProgramInfo ? convertProgram(ProgramInfo.Program) : undefined;
  }
  if (Video) {
    videoId = Video[0].youtubeVideoId;
    duration = Video[0].duration;
    thumb = getThumbnail(videoId || '');
  }

  return JSON.parse(JSON.stringify({
    ...content,
    id: id.toString(),
    programId: programInfoId,
    contentType: type,
    createDt: releaseAt,
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
  const { id } = program;
  return {
    ...program,
    id: id.toString(),
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
      exposed = videoContentProduct.VideoExposureTime.map(videoExposureTime => [videoExposureTime.exposedOffsetBeginMs, videoExposureTime.exposedOffsetEndMs]);
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
