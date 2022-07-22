const Celeb = `
    type Celeb {
      id: String!
      name: String!
      description: String
      categories: [Category]
      thumbnail: String
      ba_thumbnail: String
      countOfFollowers: Float
      countOfYotubeFollowers:Float
      countOfInstagramFollowers:Float
      countOfProducts: Float
      countOfContents: Float
    }
` ;

export default Celeb;
