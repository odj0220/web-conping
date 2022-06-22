import { buildSchema, graphql } from 'graphql';
import { list, product } from '../product/_product';

export async function Graphql(query: string) {
  const schema = buildSchema(`
		type Wholesale {
            wholesaleStoreId: ID
			address: String
            building: String
            favorite: Boolean
            floor: String
            formattedPhone: String
            imgPath: String
            name: String
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
			productId: ID
            code: String
            createDt: Int
            expired: Boolean
            imgPaths: [String]
            item: Category
            name: String
            price: Int
            updateDt: Int
            wholesale: Wholesale
            similar: [Product]
		}
		
		type Query {
			products: [Product]
			product(id:ID): Product
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
  };

  return graphql({
    schema,
    source: query,
    rootValue,
  });
}
