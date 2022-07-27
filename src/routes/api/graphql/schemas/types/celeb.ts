const Celeb = `
    type Celeb {
      id: String!
      name: String!
      description: String
      categories: [Category]
      thumbnail: String
      banner: String
      countOfFollowers: Float
      countOfYotubeFollowers:Float
      countOfInstagramFollowers:Float
      countOfProducts: Float
      countOfContents: Float
      
      youtubeUrl: String
      instagramUrl: String
      gender: String
      nationality: String
    }
` ;

export default Celeb;
