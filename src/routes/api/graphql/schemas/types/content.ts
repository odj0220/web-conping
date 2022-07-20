const Content = `
    type Content {
      id: ID!
      title: String!
      subtitle: String
      programId: String
      contentType: ContentType
      createDt: Float!
      episode: Int
      description: String
      url: String
      videoId: String
      thumb: String
      program: Program
      currentTime: Float
      duration: Float
      views: Float
    }
` ;

export default Content;
