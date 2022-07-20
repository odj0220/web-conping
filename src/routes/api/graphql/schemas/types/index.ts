import Product from './product';
import Program from './program';
import Content from './content';
import Celeb from './celob';
import BannerLink from './bannerLink';
import Banner from './banner';
import MainContent from './mainContent';
import Title from './title';
import MainSeries from './mainSeries';
import ContentEdge from './contentEdge';
import PageInfo from './pageInfo';
import PageContent from './pageContent';
import MainOrigin from './mainOrigin';

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
};

export default Object.values(types).reduce((result: string, type: string) => result + type, '');


