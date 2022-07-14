export interface Program {
  id: string;
  title: string;
  description: string;
  banner: string;
  thumbnail: string;
  regularAiringAt: number;
  airingBeginAt: number;
  airingEndAt: number;
}

export interface Content {
  id: string;
  title: string;
  subtitle: string;
  programId: string;
  contentType: string;
  createDt: number;
  episode: number;
  description: string;
  url: string;
  videoId: string;
  thumb: string;
  program: Program;
  currentTime: number;
  duration: number;
  views: number;
}

export interface TitleElement {
  text: string,
  type?: string,
}

export interface Program {
  id: string;
  name: string;
  description: string;
  bannerImg: string;
  profileImg: string;
  releasedAt: number;
  airingAt: number;
  airingBeginAt: number;
  airingEndAt: number;
}

export interface ICeleb {
  id: string;
  name: string;
  description: string;
  categories: string[];
  thumbnail: string;
  follows: ICeleb[];
  programs: Program[];
  products: IProduct[];
}

export interface IProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  discount: number;
  category: string;
  exposed: [[number]];
  views: number;
}
