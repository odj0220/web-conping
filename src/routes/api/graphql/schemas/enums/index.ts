import ContentType from './contentType';
import Order from './order';
import RelatedItemType from './relatedItemType';

const enums = {
  ContentType,
  Order,
  RelatedItemType,
};

export default Object.values(enums).reduce((result: string, type: string) => result + type, '');


