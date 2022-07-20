import ContentType from './contentType';
import Order from './order';

const enums = {
  ContentType,
  Order,
};

export default Object.values(enums).reduce((result: string, type: string) => result + type, '');


