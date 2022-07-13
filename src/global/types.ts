export interface Content {
  videoId: string
  name: string,
  contentType: string;
  createDt: number;
  description: string;
  id: string;
  program: Program,
  programId: string;
  round: number;
  thumb: string;
  url: string;
}

export interface Program {
  id: string;
  name: string;
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
  follows: Celeb[];
  programs: Program[];
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  discount: number;
  category: string;
  exposed: [[number]];
}
