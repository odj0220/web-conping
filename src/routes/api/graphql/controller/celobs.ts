import celebJson from '../../../../../static/data/celeb.json';
import relationJson from '../../../../../static/data/relation.json';
import contentJson from '../../../../../static/data/content.json';

export const celebs = () => celebJson;

export const celeb = ({ id }: { id: string }) => {
  return celebJson.find((celeb) => celeb.id === id);
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
