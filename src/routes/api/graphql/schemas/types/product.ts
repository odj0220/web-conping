const Product = `
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
` ;

export default Product;
