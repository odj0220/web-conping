import ContentType from './contentType';
import Order from './order';
import RelatedItemType from './relatedItemType';
import ProductOrder from './productOrder';
import SocialType from './socialType';

const enums = {
  ContentType,
  Order,
  RelatedItemType,
  ProductOrder,
  SocialType,
};

export default Object.values(enums).reduce((result: string, type: string) => result + type, '');


