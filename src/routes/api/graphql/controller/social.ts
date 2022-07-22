import socialJson from '../../../../../static/data/social.json';
import relationJson from '../../../../../static/data/relation.json';

export const socials = () => socialJson;

export const getSocialsByCelebId = ({ id, type }: {id: string; type: string}) => {
  const relation = relationJson.find((r) => r.celeb === id);
  let result: any = [];

  if (relation) {
    result = socialJson.filter((s: any) => s.id === relation.social);
    if (type) {
      result = result.filter((s: any) => s.type === type);
    }
  }

  return result;
};
