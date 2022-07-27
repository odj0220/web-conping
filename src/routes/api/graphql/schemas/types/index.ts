import Product from './product';
import Program from './program';
import Content from './content';
import Celeb from './celeb';
import BannerLink from './bannerLink';
import Banner from './banner';
import MainContent from './mainContent';
import Title from './title';
import MainSeries from './mainSeries';
import ContentEdge from './contentEdge';
import PageInfo from './pageInfo';
import PageContent from './pageContent';
import MainOrigin from './mainOrigin';
import RelatedItem from './relatedItem';
import Category from './category';
import Social from './social';
import PageCeleb from './pageCeleb';
import CelebEdge from './celebEdge';
import ProductEdge from './productEdge';
import pageProduct from './pageProduct';

const types = {
  Product,
  Program,
  Content,
  Celeb,
  Banner,
  BannerLink,
  MainContent,
  Title,
  MainSeries,
  ContentEdge,
  PageInfo,
  PageContent,
  MainOrigin,
  RelatedItem,
  Category,
  Social,

  PageCeleb,
  CelebEdge,
  ProductEdge,
  pageProduct,
};

export default Object.values(types).reduce((result: string, type: string) => result + type, '');


