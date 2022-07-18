import { buildSchema, graphql } from 'graphql';
import contentJson from '../../../../static/data/content.json';
import productJson from '../../../../static/data/product.json';
import celebJson from '../../../../static/data/celeb.json';
import exposedJson from '../../../../static/data/exposed.json';
import programJson from '../../../../static/data/program.json';
import relationJson from '../../../../static/data/relation.json';
import watchingJson from '../../../../static/data/watching.json';
import bannerJson from '../../../../static/data/banner.json';
import type { GraphQLSchema } from 'graphql/type/schema';

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
		
		enum Order {
		  LIKE
		  VIEW
		  CREATE
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
	
		
		type Query {
		  products: [Product]
			product(id:ID!): Product
			contents(order:Order, type:ContentType): [Content]
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
    products: () => {
      return productJson;
    },
    product: ({ id }: { id: string }) => {
      return productJson.find((product) => product.id === id);
    },
    contents: ({ order, type }: { order: string; type: string }) => {
      const result = contentJson.map((content) => {
        return {
          ...content,
          program: programJson.find(
            (program) => program.id === content.programId,
          ),
        };
      });
      return result;
    },
    content: ({ id }: { id: string }) => {
      const content: any = contentJson.find((content) => content.id === id);
      const program = programJson.find(
        (program) => program.id === content.programId,
      );
      const currentTime =
        watchingJson.find((watching) => watching.contentId === content.id)
          ?.currentTime || 0;
      return {
        ...content,
        program,
        currentTime,
      };
    },
    celebs: () => {
      return celebJson;
    },
    celeb: ({ id }: { id: string }) => {
      return celebJson.find((celeb) => celeb.id === id);
    },
    programs: () => {
      return programJson;
    },
    program: ({ id }: { id: string }) => {
      return programJson.find((program) => program.id === id);
    },
    getProductsByContentId: ({ id }: { id: string }) => {
      const products = exposedJson
        .filter((exposed) => exposed.content === id)
        .map((exposed) => {
          const product = productJson.find(
            (product) => product.id === exposed.product,
          );
          return {
            ...product,
            exposed: exposed.timelines,
          };
        });
      return products;
    },
    getCelebsByContentId: ({ id }: { id: string }) => {
      const celebIds = relationJson
        .filter((relation) => relation.content === id)
        .map((relation) => relation.celeb);
      return celebJson.filter((celeb) => celebIds.includes(celeb.id));
    },
    getContentsByProductId: ({ id }: { id: string }) => {
      const contentIds = relationJson
        .filter((relation) => relation.product === id)
        .map((relation) => relation.content);
      return contentJson.filter((content) => contentIds.includes(content.id));
    },
    getCelebsByProductId: ({ id }: { id: string }) => {
      const celebIds = relationJson
        .filter((relation) => relation.product === id)
        .map((relation) => relation.celeb);
      return celebJson.filter((celeb) => celebIds.includes(celeb.id));
    },
    getCelebsByProgramId: ({ id }: { id: string }) => {
      const contents = contentJson
        .filter((content) => content.programId === id)
        .map((content) => content.id);
      const celebIds = relationJson
        .filter((relation) => contents.includes(relation.content))
        .map((relation) => relation.celeb);
      return celebJson.filter((celeb) => celebIds.includes(celeb.id));
    },
    getProductByCelebId: ({ id }: { id: string }) => {
      const productIds = relationJson
        .filter((relation) => relation.celeb === id)
        .map((relation) => relation.product);
      return productJson.filter((product) => productIds.includes(product.id));
    },
    getContentsByCelebId: ({ id }: { id: string }) => {
      const contentIds = relationJson
        .filter((relation) => relation.celeb === id)
        .map((relation) => relation.content);
      return contentJson.filter((content) => contentIds.includes(content.id));
    },
    getContentsByProgramId: ({ id, type }: { id: string; type: string }) => {
      return contentJson
        .filter((content) => {
          if (content.programId !== id) {
            return false;
          }
          return !type || type === content.contentType;
        })
        .map((content) => {
          return {
            ...content,
            program: programJson.find(
              (program) => program.id === content.programId,
            ),
          };
        });
    },
    getProgramContentsByContentId: ({ id }: {id: string}) => {
      const content: any = contentJson.find(contentItem => contentItem.id === id);
      return contentJson
        .filter(contentItem => (contentItem.programId === content.programId && contentItem.id !== id))
        .filter(contentItem => (contentItem.contentType === 'FULL' || contentItem.contentType === 'HIGHLIGHT'))
        .map(contentItem => {
          return {
            ...contentItem,
            program: programJson.find(program => program.id === content.programId),
          };
        });
    },
    getProductsByCategory: ({ category }: { category: string }) => {
      return productJson.filter((product) => product.category === category);
    },
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
    getMainContents: () => {
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
      const totalCount = contentJson.length;
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
