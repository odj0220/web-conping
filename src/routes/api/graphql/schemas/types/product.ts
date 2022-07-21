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
      createDt: Float
      celebs: [Celeb]
      contents: [Content]
      relatedItems: [RelatedItem]
    }
` ;

export default Product;
