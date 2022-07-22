const Celeb = `
    type Celeb {
      id: String!
      name: String!
      description: String
      categories: [Category]
      thumbnail: String
      countOfFollowers: Float
      countOfProducts: Float
      countOfContents: Float
    }
` ;

export default Celeb;
