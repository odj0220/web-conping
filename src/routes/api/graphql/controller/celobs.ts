import celebJson from '../../../../../static/data/celeb.json';
import relationJson from '../../../../../static/data/relation.json';
import contentJson from '../../../../../static/data/content.json';
import productJson from '../../../../../static/data/product.json';
import categoryJson from '../../../../../static/data/category.json';

export const celebs = () => {
  let data: any[] = celebJson;

  data = data.map((celeb) => {
    const relations: any[] = relationJson.filter((r) => r.celeb === celeb.id);
    const contents: any[] = contentJson.filter((content) => relations.find((r) => r.content === content.id));
    const products: any[] = productJson.filter((product) => relations.find((r) => r.product === product.id));
    const categories: any[] = celeb.categories.map((categoryId: string) => categoryJson.find((cate) => cate.id === categoryId));
    const { instagram, youtube, total } = celeb.follows as any;

    return {
      ...celeb,
      categories,
      countOfFollowers: total,
      countOfProducts: products.length,
      countOfYotubeFollowers: youtube,
      countOfInstagramFollowers: instagram,
      countOfContents: contents.length,
    };
  });

  return data;
};

export const celeb = ({ id }: { id: string }) => {
  const result = {};
  const relations: any[] = relationJson.filter((r) => r.celeb === id);
  const foundCeleb: any = celebJson.find((celeb) => celeb.id === id);
  const products: any[] = productJson.filter((product) => relations.find((r) => r.product === product.id));
  const contents: any[] = contentJson.filter((content) => relations.find((r) => r.content === content.id));

  if (foundCeleb) {
    const categories = foundCeleb.categories.map((categoryId: string) => categoryJson.find((cate) => cate.id === categoryId));

    return {
      ...foundCeleb,
      categories,
      countOfFollowers: foundCeleb.follows.total,
      countOfProducts: products.length,
      countOfYotubeFollowers: foundCeleb.follows.youtube,
      countOfInstagramFollowers: foundCeleb.follows.insetagram,
      countOfContents: contents.length,
    };
  }

  return result;
};

export const getCelebsByContentId = ({ id }: { id: string }) => {
  const celebIds = relationJson
    .filter((relation) => relation.content === id)
    .map((relation) => relation.celeb);
  return celebJson.filter((celeb) => celebIds.includes(celeb.id));
};

export const getCelebsByProductId = ({ id }: { id: string }) => {
  const celebIds = relationJson
    .filter((relation) => relation.product === id)
    .map((relation) => relation.celeb);
  return celebJson.filter((celeb) => celebIds.includes(celeb.id));
};

export const getCelebsByProgramId = ({ id }: { id: string }) => {
  const contents = contentJson
    .filter((content) => content.programId === id)
    .map((content) => content.id);
  const celebIds = relationJson
    .filter((relation) => contents.includes(relation.content))
    .map((relation) => relation.celeb);
  return celebJson.filter((celeb) => celebIds.includes(celeb.id));
};
