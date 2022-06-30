import { buildSchema, graphql } from 'graphql';
import contentJson from '../../../../static/data/content.json';
import productJson from '../../../../static/data/product.json';
import celebJson from '../../../../static/data/celeb.json';
import exposedJson from '../../../../static/data/exposed.json';
import programJson from '../../../../static/data/program.json';
import relationJson from '../../../../static/data/relation.json';

export async function Graphql(query: string) {
  const schema = buildSchema(`
		type Product {
		    id: String!
            name: String!
            brand: String
            price: Int
            discount: Int
            category: String
            exposed: [[Int]]
		}
		
        type Program {
          id: String!
          name: String!
          description: String
		}
		
		type Content {
		  id: ID!
          name: String!
          programId: String
          contentType: String
          createDt: Float!
          round: Int
          description: String
          url: String
          videoId: String
          thumb: String
          program: Program
		}
		
		type Celeb {
          id: String!
          name: String!
          description: String
          category: String
		}
		
	
		
		type Query {
			products: [Product]
			product(id:ID!): Product
			contents: [Content]
			content(id:ID!): Content
			celebs: [Celeb]
			celeb(id:ID!): Celeb
			programs: [Program]
			program(id:ID!): Program
			getProductsByContentId(id:ID!): [Product]
			getCelebsByContentId(id:ID!): [Celeb]
            getContentsByProgramId(id:ID!): [Content]
            getContentsByProductId(id:ID!): [Content]
            getCelebsByProductId(id:ID!): [Celeb]
            getProductByCelebId(id:ID!): [Product]
            getContentsByCelebId(id:ID!): [Content]
            getProductsByCategory(category:String!): [Product]
  	    }
	`);

  const rootValue = {
    products: () => {
      return productJson;
    },
    product: ({ id }: {id:string}) => {
      return productJson.find(product => product.id === id);
    },
    contents: () => {
      const result = contentJson.map(content => {
        return {
          ...content,
          program: programJson.find(program => program.id === content.programId),
        };
      });
      console.log(result);

      return result;
    },
    content: ({ id }: {id:string}) => {
      const content: any = contentJson.find(content => content.id === id);
      return {
        ...content,
        program: programJson.find(program => program.id === content.programId),
      };
    },
    celebs: () => {
      return celebJson;
    },
    celeb: ({ id }: {id:string}) => {
      return celebJson.find(celeb => celeb.id === id);
    },
    programs: () => {
      return programJson;
    },
    program: ({ id }: {id:string}) => {
      return programJson.find(program => program.id === id);
    },
    getProductsByContentId: ({ id }: {id:string}) => {
      const products = exposedJson
        .filter(exposed => exposed.content === id)
        .map(exposed => {
          const product = productJson.find(product => product.id === exposed.product);
          return {
            ...product,
            exposed: exposed.timelines,
          };
        });
      return products;
    },
    getCelebsByContentId: ({ id }: {id:string}) => {
      const celebIds = relationJson
        .filter(relation => relation.content === id)
        .map(relation => relation.celeb);
      return celebJson.filter(celeb => celebIds.includes(celeb.id));
    },
    getContentsByProductId: ({ id }: {id:string}) => {
      const contentIds = relationJson
        .filter(relation => relation.product === id)
        .map(relation => relation.content);
      return contentJson.filter(content => contentIds.includes(content.id));
    },
    getCelebsByProductId: ({ id }: {id:string}) => {
      const celebIds = relationJson
        .filter(relation => relation.product === id)
        .map(relation => relation.celeb);
      return celebJson.filter(celeb => celebIds.includes(celeb.id));
    },
    getProductByCelebId: ({ id }: {id:string}) => {
      const productIds = relationJson
        .filter(relation => relation.celeb === id)
        .map(relation => relation.product);
      return productJson.filter(product => productIds.includes(product.id));
    },
    getContentsByCelebId: ({ id }: {id:string}) => {
      const contentIds = relationJson
        .filter(relation => relation.celeb === id)
        .map(relation => relation.content);
      return contentJson.filter(content => contentIds.includes(content.id));
    },
    getContentsByProgramId: ({ id }: {id:string}) => {
      return contentJson.filter(content => content.programId === id);
    },
    getProductsByCategory: ({ category }: {category:string}) => {
      return productJson.filter(product => product.category === category);
    },
  };

  return graphql({
    schema,
    source: query,
    rootValue,
  });
}
