import { buildSchema, graphql } from 'graphql';
import { list, product } from '../product/_product';
/*import { readFileSync } from 'fs';
const contentsJson = readFileSync('./content.json', 'utf8');*/
import contentsJson from '../../../../static/data/content.json';
console.log(contentsJson);

export async function Graphql(query: string) {
  const schema = buildSchema(`
		type Wholesale {
            wholesaleStoreId: ID!
			address: String
            building: String
            favorite: Boolean
            floor: String
            formattedPhone: String
            imgPath: String
            name: String!
            phone: String
            section: String
            wsSeq: String
		}
		
		type Category {
            gender: String
            itemType: String
            itemLarge: String
            itemMiddle: String
        }
		
		type Product {
			productId: ID!
            code: String!
            createDt: Float!
            expired: Boolean
            imgPaths: [String]
            item: Category
            name: String!
            price: Int!
            updateDt: Float
            wholesale: Wholesale
            similar: [Product]
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
          thumb: String
		}
		
		type Query {
			products: [Product]
			product(id:ID): Product
			contents: [Content]
  	    }
	`);

  const rootValue = {
    products: async () => {
      const result = await list();
      return result;
    },
    product: async ({ id }: {id:string}) => {
      const result = await product(id);
      return result;
    },
    contents: () => {
      return contentsJson;
    }
  };

  return graphql({
    schema,
    source: query,
    rootValue,
  });
}
