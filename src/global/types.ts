import type { SvelteComponent } from 'svelte';
import contents from '../fixtures/contents';

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
  text: string;
  type?: string;
  style?: string;
}

export interface ICeleb {
  id: string;
  name: string;
  description: string;
  categories?: string[];
  thumbnail?: string;
  banner?: string;
  countOfFollowers?: number;
  countOfYoutubeFollowers?: number;
  countOfInstagramFollowers?: number;
  countOfProducts?: number;
  countOfContents?: number;
  youtubeUrl?: string;
  instagramUrl?: string;
  gender?: string;
  nationality?: string;
  youtubeChannelId?: string;
  youtubeContents?: IContent[];
}

export interface IRelatedItemType {
  content: IContent;
  celeb: ICeleb;
  product: IProduct;
}

export interface IRelatedItem {
  thumbnail: string;
  title: string;
  type: IRelatedItemType;
  id: string;
}

export interface IBadge {
  rank: string;
  iconTheme: string;
}

export interface IProductEdge {
  node: IProduct;
  cursor: string;
}

export interface PageInfo {
  startCursor: string;
  hasNextPage: boolean;
  page: number;
  totalPage: number;
}

export interface IPageProduct {
  totalCount: string;
  edges: [IProductEdge];
  pageInfo: PageInfo;
}

export interface IProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  discount?: number;
  category?: string;
  exposed: [[number]];
  image: string;
  views: number;
  discountRate: number;
  storeUrl: string;
  relatedItems: IRelatedItem[];
  badge: IBadge;
}

export interface ISelectItem {
  name: string;
  value: string;
}

export interface ITabItem {
  label: string;
  index: number;
  id?: number;
  component?: SvelteComponent;
}

export interface IMetadata {
  title: string;
  description?: string;
  info: any[];
  programTitle?: string;
}

export interface YoutubeVideo {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: Date;
  };
}
