const Celeb = `
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
` ;

export default Celeb;
