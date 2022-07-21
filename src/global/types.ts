export interface IProgram {
  id?: string;
  title?: string;
  description?: string;
  banner?: string;
  thumbnail?: string;
  regularAiringAt?: number;
  airingBeginAt?: number;
  airingEndAt?: number;
  totalEpisode?: number;
}

export interface IContent {
  id?: string;
  title?: string;
  subtitle?: string;
  programId?: string;
  contentType?: string;
  createDt?: number;
  episode?: number;
  description?: string;
  url?: string;
  videoId?: string;
  thumb?: string;
  program?: IProgram;
  currentTime?: number;
  duration?: number;
  views?: number;
}

export interface TitleElement {
  text: string,
  type?: string,
  style?: string;
}

export interface ICeleb {
  id: string;
  name: string;
  description: string;
  categories: string[];
  thumbnail: string;
  follows: ICeleb[];
  programs: IProgram[];
  products: IProduct[];
  banner: string;
}

export interface IProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  discount: number;
  category: string;
  exposed: [[number]];
  image: string;
  views: number;
  discountRate: number;
  storeUrl: string;
}

export interface ISelectItem {
  name: string;
  value: string;
}
