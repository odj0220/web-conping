/**
 * Model VideoContent
 * 비디오가 있는 컨텐츠를 표현할 Entity
 */
export type VideoContent = {
  id: number
  title: string
  subtitle?: string | null
  description?: string | null
  views: number
  type: VideoContentType
  releaseAt: Date
  createdAt: Date
  updatedAt: Date
  programInfoId: number
  videoContentDetailId: number | null

  //relation table
  ProgramInfo?: ProgramInfo
  VideoContentDetail?: VideoContentDetail
  Video?: Video[]
  VideoContentProduct?: VideoContentProduct[]
  VideoContentCast?: VideoContentCast[]
  VideoContentComment?: VideoContentComment[]
  UserFavoriteVideoContent?: UserFavoriteVideoContent[]
  UserWishVideoContent?: UserWishVideoContent[]
}

/**
 * Model VideoContentDetail
 * VideoContent의 상세 정보
 */
export type VideoContentDetail = {
  id: number
  //relation table
  VideoContent?: VideoContent
}

/**
 * Model Video
 * Video 정보를 표현하기 위한 Entity
 */
export type Video = {
  id: number
  youtubeVideoId: string | null
  vimeoVideoId: number | null
  view: number
  duration: number
  videoContentId: number
  //relation table
  VideoContent?: VideoContent
}

/**
 * Model VideoContentProduct
 *
 */
export type VideoContentProduct = {
  id: number
  videoContentId: number
  productId: number

  // relation table
  VideoContent?: VideoContent
  Product?: Product
  VideoExposureTime?: VideoExposureTime[]
}

/**
 * Model VideoContentComment
 *
 */
export type VideoContentComment = {
  comment: string
  userId: string
  videoContentId: number

  // relation table
  User?: User
  VideoContent?: VideoContent
}

/**
 * Model VideoExposureTime
 *
 */
export type VideoExposureTime = {
  id: number
  exposedOffsetBeginMs: number
  exposedOffsetEndMs: number
  videoContentProductId: number

  // relation table
  VideoContentProduct?: VideoContentProduct
}

/**
 * Model ProgramInfo
 * VideoContent의 시리즈 정보를 표현하기 위한 Entity
 */
export type ProgramInfo = {
  id: number
  episode: number
  contentName: string | null
  programId: number

  // relation table
  Program?: Program
  VideoContent?: VideoContent[]
}

/**
 * Model Program
 *
 */
export type Program = {
  id: number
  title: string
  description: string
  age: number
  genre: string
  banner: string
  thumbnail: string
  views: number
  totalEpisode: number
  regularAiringAt: Date
  airingBeginAt: Date
  airingEndAt: Date | null

  // relation table
  ProgramInfo?: ProgramInfo[]
  UserFavoriteProgram?: UserFavoriteProgram[]
  UserWishProgram?: UserWishProgram[]
  ProgramCast?: ProgramCast[]
}

/**
 * Model Product
 *
 */
export type Product = {
  id: number
  name: string
  price: number
  image: string
  isDisplay: boolean
  discountRate: number
  shippingType: Shipping
  shippingFee: number
  views: number
  createdAt: Date
  updatedAt: Date
  storeUrl: string

  // relation table
  VideoContentProduct?: VideoContentProduct[]
  UserFavoriteProduct?: UserFavoriteProduct[]
  CelebProduct?: CelebProduct[]
  UserWishProduct?: UserWishProduct[]
}

/**
 * Model ProductEvent
 *
 */
export type ProductEvent = {
  id: number
  name: string
  createdAt: Date
  endedAt: Date
}

/**
 * Model Celeb
 * 셀럽 정보를 표현하기 위한 Entity
 */
export type Celeb = {
  id: number
  name: string
  image: string
  backImage: string
  description: string | null
  youtubeUrl: string | null
  instagramUrl: string | null
  gender: Gender
  nationality: Nationality

  snsFollowerCount?: number
  productCount?: number
  videoContentCount?: number

  // relation table
  CelebFollower?: CelebFollower[]
  CelebProduct?: CelebProduct[]
  CelebCategory?: CelebCategory[]
  VideoContentCast?: VideoContentCast[]
  ProgramCast?: ProgramCast[]
  createdAt: Date
  updatedAt: Date
}

/**
 * Model CelebProduct
 *
 */
export type CelebProduct = {
  celebId: number
  productId: number

  //relation table
  Celeb?: Celeb
  Product?: Product
}

/**
 * Model CelebFollower
 * Celeb을 팔로우 하고 있는 사용자
 */
export type CelebFollower = {
  celebId: number
  userId: string

  // relation table
  Celeb?: Celeb
  User?: User
}

/**
 * Model CelebCategory
 * 셀럽의 카테고리를 표현할 Entity
 */
export type CelebCategory = {
  celebId: number
  categoryId: number
  order: number

  // relation table
  Celeb?: Celeb
  Category?: Category
}

/**
 * Model VideoContentCast
 * 캐스팅 정보를 표현할 Entity
 */
export type VideoContentCast = {
  celebId: number
  videoContentId: number

  // relation table
  Celeb?: Celeb
  VideoContent?: VideoContent
}

/**
 * Model ProgramCast
 *
 */
export type ProgramCast = {
  celebId: number
  programId: number

  // relation table
  Celeb?: Celeb
  Program?: Program
}

/**
 * Model User
 * 유저 정보를 나타낼 Entity
 */
export type User = {
  id: string

  // relation table
  VideoContentComment?: VideoContentComment[]
  UserFavoriteProgram?: UserFavoriteProgram[]
  UserFavoriteProduct?: UserFavoriteProduct[]
  CelebFollower?: CelebFollower[]
  UserFavoriteVideoContent?: UserFavoriteVideoContent[]
  UserWishProduct?: UserWishProduct[]
  UserWishVideoContent?: UserWishVideoContent[]
  UserWishProgram?: UserWishProgram[]
}

/**
 * Model UserFavoriteVideoContent
 *
 */
export type UserFavoriteVideoContent = {
  userId: string
  videoContentId: number
  createdAt: Date

  User?: User
  VideoContent?: VideoContent
}

/**
 * Model UserFavoriteProgram
 *
 */
export type UserFavoriteProgram = {
  userId: string
  programId: number
  createdAt: Date

  User?: User
  Program?: Program
}

/**
 * Model UserFavoriteProduct
 *
 */
export type UserFavoriteProduct = {
  userId: string
  productId: number
  createdAt: Date

  User?: User
  Product?: Product
}

/**
 * Model UserWishProgram
 *
 */
export type UserWishProgram = {
  userId: string
  programId: number
  createdAt: Date

  User?: User
  Program?: Program
}

/**
 * Model UserWishVideoContent
 *
 */
export type UserWishVideoContent = {
  userId: string
  videoContentId: number
  createdAt: Date

  User?: User
  VideoContent?: VideoContent
}

/**
 * Model UserWishProduct
 *
 */
export type UserWishProduct = {
  userId: string
  productId: number
  createdAt: Date

  User?: User
  Product?: Product
}

/**
 * Model Image
 * Image 정보를 표현하기 위한 Entity
 */
export type Image = {
  id: number
}

/**
 * Model Category
 * Cateogry 정보를 표현하기 위한 Entity
 */
export type Category = {
  id: number
  name: string
  fontColor: string
  backColor: string
  type: CategoryType

  CelebCategory?: CelebCategory[]
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export enum VideoContentType {
  FULL = 'FULL',
  HIGHLIGHT = 'HIGHLIGHT',
  SHORTS = 'SHORTS'
}

export enum Shipping {
  FREE = 'FREE',
  PREPAY = 'PREPAY',
  CASH = 'CASH'
}

export enum Gender {
  UNKNOWN = 'UNKNOWN',
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export enum Nationality {
  UNKNOWN = 'UNKNOWN',
  KOREA = 'KOREA',
  CHINA = 'CHINA',
  JAPAN = 'JAPAN',
  USA = 'USA'
}

export enum CategoryType {
  CELEB = 'CELEB',
  PRODUCT = 'PRODUCT',
  VIDEOCONTENT = 'VIDEOCONTENT',
  BRAND = 'BRAND',
  SERIES = 'SERIES'
}
