const Celeb = `
    type Celeb {
      id: String!
      name: String!
      description: String
      categories: [Category]
      thumbnail: String
      banner: String
      countOfFollowers: Float
      countOfYoutubeFollowers:Float
      countOfInstagramFollowers:Float
      countOfProducts: Float
      countOfContents: Float
      
      youtubeUrl: String
      instagramUrl: String
      gender: String
      nationality: String
      youtubeChannelId: String
      contents: [Content]
    }
` ;

export default Celeb;
